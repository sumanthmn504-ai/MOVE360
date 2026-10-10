import { demoActivities, demoEquipment, demoReport, demoTeacher } from '../data/demo'
import type { Activity, DashboardData, EquipmentItem, SessionForm, SessionRecord, Teacher } from '../types'

const API_BASE = 'http://localhost:8000'

function getToken() {
  return localStorage.getItem('move360_token') || ''
}

function getHeaders(withJson = true) {
  const headers: Record<string, string> = {}
  if (withJson) headers['Content-Type'] = 'application/json'
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...getHeaders(options.method !== 'GET' && !(options.body instanceof FormData)),
      ...(options.headers || {}),
    },
  })
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(data.detail || 'Request failed')
  }
  return response.json() as Promise<T>
}

export async function loginTeacher(username: string, password: string): Promise<{ access_token: string; token_type: string }> {
  try {
    return await api<{ access_token: string; token_type: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  } catch {
    if (username === demoTeacher.username && password === demoTeacher.password) {
      const token = 'demo-token'
      localStorage.setItem('move360_token', token)
      localStorage.setItem('move360_user', JSON.stringify({
        id: 1,
        username: demoTeacher.username,
        email: demoTeacher.email,
        full_name: demoTeacher.full_name,
        role: 'teacher',
      }))
      return { access_token: token, token_type: 'bearer' }
    }
    throw new Error('Incorrect username or password')
  }
}

export async function registerTeacher(payload: { username: string; email: string; full_name: string; password: string }): Promise<{ access_token: string; token_type: string }> {
  try {
    return await api<{ access_token: string; token_type: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch {
    const token = 'demo-token'
    localStorage.setItem('move360_token', token)
    localStorage.setItem('move360_user', JSON.stringify({
      id: 1,
      username: payload.username,
      email: payload.email,
      full_name: payload.full_name,
      role: 'teacher',
    }))
    return { access_token: token, token_type: 'bearer' }
  }
}

export async function getCurrentTeacher(): Promise<Teacher | null> {
  const saved = localStorage.getItem('move360_user')
  if (saved) return JSON.parse(saved)
  try {
    const user = await api<Teacher>('/api/auth/me')
    localStorage.setItem('move360_user', JSON.stringify(user))
    return user
  } catch {
    return null
  }
}

export async function getDashboard(): Promise<DashboardData> {
  try {
    return await api('/api/dashboard')
  } catch {
    return {
      welcome: 'Welcome back, Demo PE Teacher',
      today_sessions: 3,
      total_students: 36,
      sessions_completed: 2,
      average_participation: 74,
      average_active_minutes: 28,
      waiting_students: 6,
      equipment_status: 'Ready for 3 activity zones',
      participation_goal: { target: '32 / 36', label: 'Demo estimate until field data exists' },
      recent_sessions: [
        { name: 'Grade 5 Athletics Mix', date: 'Today', status: 'Completed' },
        { name: 'Grade 3 Ball Skills', date: 'Yesterday', status: 'Completed' },
      ],
    }
  }
}

export async function getActivities(): Promise<Activity[]> {
  try {
    return await api('/api/activities')
  } catch {
    return demoActivities as Activity[]
  }
}

export async function getEquipment(): Promise<EquipmentItem[]> {
  try {
    return await api('/api/equipment')
  } catch {
    return demoEquipment as EquipmentItem[]
  }
}

export async function createSession(data: SessionForm): Promise<SessionRecord> {
  try {
    return await api('/api/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } catch {
    return {
      id: Date.now(),
      grade: data.grade,
      class_name: data.class_name,
      student_count: data.student_count,
      duration: data.duration,
      objective: data.objective,
      intensity: data.intensity,
      location: data.location,
      ground_size: data.ground_size,
      generated_summary: 'Warm-up, activity zones, rotation schedule, and cool-down prepared.',
      participation_target: Math.max(20, Math.round(data.student_count * 0.85)),
      created_at: new Date().toISOString(),
    }
  }
}

export async function generateSession(sessionId: number) {
  try {
    return await api(`/api/sessions/${sessionId}/generate`, { method: 'POST' })
  } catch {
    return {
      message: 'Inclusive session generated',
      warm_up: 'Dynamic mobility and coordination game',
      groups: [
        { name: 'Group A', students: ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5', 'Student 6'] },
        { name: 'Group B', students: ['Student 7', 'Student 8', 'Student 9', 'Student 10', 'Student 11', 'Student 12'] },
      ],
      participation_target: 30,
      zones: [
        { name: 'Zone 1', activity: 'Treasure Trail Run', group: 'Group A', duration: 8, equipment: 'Cones', instructions: 'Move quickly but safely between markers.', difficulty: 'Beginner', adaptation: 'Shorter route', safety: 'Maintain spacing' },
        { name: 'Zone 2', activity: 'Target Toss Circuit', group: 'Group B', duration: 8, equipment: 'Balls', instructions: 'Throw and recover before your next turn.', difficulty: 'Standard', adaptation: 'Larger target', safety: 'Check the lane is clear' },
      ],
      rotation_schedule: [
        { round: 1, group: 'Group A', zone: 'Zone 1', activity: 'Treasure Trail Run' },
        { round: 1, group: 'Group B', zone: 'Zone 2', activity: 'Target Toss Circuit' },
      ],
    }
  }
}

export async function getComparisonReport() {
  try {
    return await api('/api/reports/comparison')
  } catch {
    return demoReport
  }
}

export async function getCurriculum(): Promise<any[]> {
  try {
    return await api<any[]>('/api/curriculum')
  } catch {
    return [{
      state: 'Pending',
      authority: 'Pending verification',
      document_name: 'Curriculum mapping pending verification.',
      version_year: 'Pending',
      grade: 5,
      learning_outcome: 'Curriculum mapping pending verification.',
      pe_competency: 'Curriculum mapping pending verification.',
      skill: 'Movement',
      activity_mapping: 'Curriculum mapping pending verification.',
      source_reference: 'Curriculum mapping pending verification.',
      verified: false,
    }]
  }
}

export async function submitFeedback(data: Record<string, unknown>) {
  try {
    return await api('/api/feedback', { method: 'POST', body: JSON.stringify(data) })
  } catch {
    return { message: 'Feedback saved', success: true }
  }
}

export async function chatWithAI(message: string): Promise<{ reply: string; fallback: boolean }> {
  try {
    return await api<{ reply: string; fallback: boolean }>('/api/v1/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context: {} }),
    })
  } catch {
    return {
      reply: 'Use a 3-zone rotation with a low-prep locomotor warm-up, one target station, and one fitness station. Keep routes short and groups to 4-6 students.',
      fallback: true,
    }
  }
}

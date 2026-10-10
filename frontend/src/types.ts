export type SessionForm = {
  grade: number
  class_name: string
  student_count: number
  duration: number
  ground_size: 'Small' | 'Medium' | 'Large'
  location: 'Indoor' | 'Outdoor'
  objective: string
  intensity: 'Low' | 'Moderate' | 'High'
  equipment_available: string
  accessibility_considerations: string
  teacher_notes: string
}

export type Activity = {
  id: number
  name: string
  description: string
  grade_range: string
  skill: string
  objective: string
  duration: number
  group_size: number
  equipment: string
  equipment_quantity: string
  space_required: string
  intensity: string
  difficulty: string
  instructions: string
  setup: string
  safety_instructions: string
  beginner_variation: string
  standard_variation: string
  challenge_variation: string
  accessibility_adaptations: string
  curriculum_mapping: string
  category: string
  demo?: boolean
}

export type Teacher = {
  id: number
  username: string
  email: string
  full_name: string
  role: string
}

export type EquipmentItem = {
  id: number
  name: string
  category: string
  quantity: number
  condition: string
  location: string
  notes: string
  available: boolean
  teacher_id: number
}

export type DashboardData = {
  welcome: string
  today_sessions: number
  total_students: number
  sessions_completed: number
  average_participation: number
  average_active_minutes: number
  waiting_students: number
  equipment_status: string
  participation_goal: { target: string; label: string }
  recent_sessions: Array<{ name: string; date: string; status: string }>
}

export type SessionRecord = {
  id: number
  grade: number
  class_name: string
  student_count: number
  duration: number
  objective: string
  intensity: string
  location: string
  ground_size: string
  generated_summary: string
  participation_target: number
  created_at: string
}

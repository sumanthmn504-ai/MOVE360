import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { SessionRecord } from '../types'

function SessionsPage() {
  const [sessions, setSessions] = useState<SessionRecord[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('move360_sessions')
    if (saved) {
      setSessions(JSON.parse(saved))
    } else {
      setSessions([
        { id: 1, grade: 5, class_name: 'Grade 5 PE', student_count: 36, duration: 40, objective: 'Movement and teamwork', intensity: 'Moderate', location: 'Outdoor', ground_size: 'Medium', generated_summary: 'Warm-up, multiple zones, balanced groups and cool-down planned.', participation_target: 30, created_at: new Date().toISOString() },
      ])
      localStorage.setItem('move360_sessions', JSON.stringify([
        { id: 1, grade: 5, class_name: 'Grade 5 PE', student_count: 36, duration: 40, objective: 'Movement and teamwork', intensity: 'Moderate', location: 'Outdoor', ground_size: 'Medium', generated_summary: 'Warm-up, multiple zones, balanced groups and cool-down planned.', participation_target: 30, created_at: new Date().toISOString() },
      ]))
    }
  }, [])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Session library</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Sessions</h1>
        </div>
        <Link to="/sessions/create" className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950">Create session</Link>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <Link key={session.id} to={`/sessions/${session.id}`} className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xl font-bold text-slate-900">{session.class_name}</div>
                <div className="text-sm text-slate-500">Grade {session.grade} • {session.student_count} students • {session.duration} mins</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-emerald-700 font-semibold">Participation target</div>
                <div className="text-lg font-bold text-slate-900">{session.participation_target} active</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-600">{session.generated_summary}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SessionsPage

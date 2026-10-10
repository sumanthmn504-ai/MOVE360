import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function SessionDetailPage() {
  const { id } = useParams()
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem('move360_sessions')
    const items = saved ? JSON.parse(saved) : []
    const found = items.find((item: any) => item.id === Number(id)) || {
      id,
      class_name: 'Grade 5 PE',
      grade: 5,
      student_count: 36,
      duration: 40,
      intensity: 'Moderate',
      location: 'Outdoor',
      ground_size: 'Medium',
      objective: 'Improve active participation',
      generated_summary: 'Warm-up, multiple activity zones, balanced groups and cool-down planned.',
      participation_target: 30,
    }
    setSession(found)
  }, [id])

  if (!session) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Session details</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">{session.class_name}</h1>
          </div>
          <Link to={`/sessions/${id}/live`} className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950">START LIVE SESSION</Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Session overview</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Grade</span><strong className="text-slate-900">{session.grade}</strong></div>
            <div className="flex justify-between"><span>Students</span><strong className="text-slate-900">{session.student_count}</strong></div>
            <div className="flex justify-between"><span>Duration</span><strong className="text-slate-900">{session.duration} min</strong></div>
            <div className="flex justify-between"><span>Location</span><strong className="text-slate-900">{session.location}</strong></div>
            <div className="flex justify-between"><span>Ground</span><strong className="text-slate-900">{session.ground_size}</strong></div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold">Inclusive session summary</h2>
          <p className="mt-3 text-slate-600">{session.generated_summary}</p>
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
            <div className="text-sm text-emerald-800">Participation target</div>
            <div className="text-2xl font-bold text-slate-900">{session.participation_target} active students</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionDetailPage

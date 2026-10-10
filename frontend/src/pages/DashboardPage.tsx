import { BarChart3, CalendarDays, Clock3, Dumbbell, Target, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDashboard } from '../services/api'
import type { DashboardData } from '../types'

function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getDashboard().then(setData)
  }, [])

  if (!data) return <div className="rounded-3xl bg-white p-6 shadow-sm">Loading dashboard...</div>

  const cards = [
    { label: 'Today’s sessions', value: data.today_sessions, icon: CalendarDays, accent: 'emerald' },
    { label: 'Total students', value: data.total_students, icon: UsersIcon, accent: 'sky' },
    { label: 'Sessions completed', value: data.sessions_completed, icon: Dumbbell, accent: 'violet' },
    { label: 'Average participation', value: `${data.average_participation}%`, icon: TrendingUp, accent: 'amber' },
  ]

  const quickActions = [
    { label: 'CREATE SESSION', route: '/sessions/create' },
    { label: 'SESSIONS', route: '/sessions' },
    { label: 'ACTIVITY LIBRARY', route: '/activities' },
    { label: 'EQUIPMENT', route: '/equipment' },
    { label: 'REPORTS', route: '/reports' },
    { label: 'AI ASSISTANT', route: '/ai-assistant' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-slate-50 p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-emerald-600">Teacher dashboard</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{data.welcome}</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('/sessions/create')}
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:translate-y-[-1px] hover:shadow-xl hover:shadow-emerald-500/30"
        >
          Create session
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, accent }) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
              accent === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
              accent === 'sky' ? 'bg-sky-100 text-sky-700' :
              accent === 'violet' ? 'bg-violet-100 text-violet-700' : 'bg-amber-100 text-amber-700'
            }`}>
              <Icon size={18} />
            </div>
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-black tracking-tight text-slate-900">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Participation overview</h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">Demo data</span>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-slate-500">Target active students</div>
                <div className="mt-1 text-3xl font-black tracking-tight text-slate-900">{data.participation_goal.target}</div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <Target size={20} />
              </div>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" />
            </div>
            <div className="mt-2 text-sm text-slate-500">{data.participation_goal.label}</div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900"><BarChart3 size={18} /> Participation</div>
          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Average active minutes</span> <span className="font-bold text-slate-900">{data.average_active_minutes} min</span></div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Waiting students</span> <span className="font-bold text-slate-900">{data.waiting_students}</span></div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Equipment</span> <span className="font-bold text-slate-900">Ready</span></div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>System status</span> <span className="font-bold text-emerald-600">Operational</span></div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Quick actions</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {quickActions.map(({ label, route }) => (
              <button
                key={label}
                type="button"
                onClick={() => navigate(route)}
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 text-left font-semibold uppercase tracking-[0.08em] text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-slate-900"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900"><Clock3 size={18} /> Recent sessions</div>
          <div className="space-y-3">
            {data.recent_sessions.map((session) => (
              <div key={session.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <div>
                  <div className="font-semibold text-slate-800">{session.name}</div>
                  <div className="text-xs text-slate-500">{session.date}</div>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-700">{session.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function UsersIcon(props: { size?: number }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1"/><circle cx="10" cy="7" r="3"/><path d="M20 19v-1a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}

export default DashboardPage

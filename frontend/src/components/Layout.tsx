import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, ClipboardCheck, Dumbbell, Grid2X2, HeartPulse, LayoutDashboard, LogOut, Settings, Sparkles, Users } from 'lucide-react'
import { getCurrentTeacher } from '../services/api'
import { useEffect, useState } from 'react'
import type { Teacher } from '../types'

function Layout() {
  const [teacher, setTeacher] = useState<Teacher | null>(null)

  useEffect(() => {
    getCurrentTeacher().then(setTeacher).catch(() => setTeacher(null))
  }, [])

  const logout = () => {
    localStorage.removeItem('move360_token')
    localStorage.removeItem('move360_user')
    window.location.href = '/login'
  }

  const navItems = [
    { label: 'Dashboard', to: '/dashboard', Icon: LayoutDashboard },
    { label: 'Sessions', to: '/sessions', Icon: ClipboardCheck },
    { label: 'Activities', to: '/activities', Icon: Dumbbell },
    { label: 'Students', to: '/students', Icon: Users },
    { label: 'Equipment', to: '/equipment', Icon: Grid2X2 },
    { label: 'Reports', to: '/reports', Icon: BarChart3 },
    { label: 'Curriculum', to: '/curriculum', Icon: HeartPulse },
    { label: 'AI Assistant', to: '/ai-assistant', Icon: Sparkles },
    { label: 'Settings', to: '/settings', Icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 w-72 border-r border-slate-800 bg-slate-950 text-slate-50 shadow-2xl shadow-slate-900/30">
        <div className="flex items-center gap-3 border-b border-slate-800 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-lg font-black text-slate-950 shadow-lg shadow-emerald-500/30">
            M
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight">MOVE360</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-300">Inclusive PE planner</div>
          </div>
        </div>

        <div className="px-4 pt-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
            <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">Teacher</div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">{teacher?.full_name || 'Demo PE Teacher'}</div>
                <div className="text-xs text-slate-400">School PE Lead</div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">✓</div>
            </div>
          </div>
        </div>

        <nav className="space-y-1.5 p-4">
          {navItems.map(({ label, to, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/90 p-4">
          <button onClick={logout} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-3 py-2.5 text-sm font-medium text-slate-100 transition hover:bg-slate-700 hover:text-white">
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      <main className="ml-72 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

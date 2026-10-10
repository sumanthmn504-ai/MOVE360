import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginTeacher, registerTeacher } from '../services/api'

function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('move360teacher')
  const [password, setPassword] = useState('teacher123')
  const [fullName, setFullName] = useState('Demo PE Teacher')
  const [email, setEmail] = useState('teacher@move360.edu')
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    try {
      const payload: { access_token: string; token_type: string } = mode === 'login'
        ? await loginTeacher(username, password)
        : await registerTeacher({ username, email, full_name: fullName, password })
      localStorage.setItem('move360_token', payload.access_token)
      navigate('/dashboard')
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-sky-50 to-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-bold text-slate-950">M</div>
          <h1 className="text-3xl font-bold text-slate-900">MOVE360</h1>
          <p className="mt-2 text-sm text-slate-500">Inclusive Physical Education Session Planner</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
          <button type="button" onClick={() => setMode('login')} className={`rounded-xl px-4 py-2 text-sm font-semibold ${mode === 'login' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}>
            Login
          </button>
          <button type="button" onClick={() => setMode('register')} className={`rounded-xl px-4 py-2 text-sm font-semibold ${mode === 'register' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}>
            Register
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div>
              <label className="mb-1 block text-sm font-medium">Full name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-500" />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-500" />
          </div>
          {mode === 'register' && (
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-500" />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-emerald-500" />
          </div>

          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

          <button type="submit" className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">
            {mode === 'login' ? 'Login to MOVE360' : 'Create teacher account'}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-500">
          Demo account: move360teacher / teacher123
        </div>
      </div>
    </div>
  )
}

export default LoginPage

import { useEffect, useState } from 'react'

function LiveSessionPage() {
  const [seconds, setSeconds] = useState(60)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return
    const timer = window.setInterval(() => setSeconds((value) => (value > 0 ? value - 1 : 0)), 1000)
    return () => window.clearInterval(timer)
  }, [isRunning])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Live session</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Grade 5 PE • Round 1</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-slate-950 p-6 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-emerald-300">Timer</div>
          <div className="mt-3 text-7xl font-black tabular-nums">{seconds}s</div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setIsRunning(!isRunning)} className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950">{isRunning ? 'Pause' : 'Start'}</button>
            <button className="flex-1 rounded-xl bg-slate-800 px-4 py-3 font-bold text-white">Next round</button>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div><div className="text-sm text-slate-500">Current zone</div><div className="text-xl font-bold text-slate-900">Zone 1 • Treasure Trail Run</div></div>
          <div><div className="text-sm text-slate-500">Next activity</div><div className="text-xl font-bold text-slate-900">Zone 2 • Target Toss Circuit</div></div>
          <div><div className="text-sm text-slate-500">Safety</div><div className="mt-1 text-sm text-slate-700">Maintain safe spacing and stop on the teacher whistle.</div></div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <button className="rounded-2xl bg-emerald-100 px-4 py-4 text-left font-semibold text-emerald-900">Active</button>
        <button className="rounded-2xl bg-amber-100 px-4 py-4 text-left font-semibold text-amber-900">Partially active</button>
        <button className="rounded-2xl bg-slate-200 px-4 py-4 text-left font-semibold text-slate-800">Waiting</button>
      </div>
    </div>
  )
}

export default LiveSessionPage

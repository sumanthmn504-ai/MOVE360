import { useEffect, useState } from 'react'
import { getComparisonReport } from '../services/api'

function ReportsPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    getComparisonReport().then(setData)
  }, [])

  if (!data) return <div>Loading reports...</div>

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Before vs after</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Participation comparison</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Before</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Students</span><strong className="text-slate-900">{data.before.students}</strong></div>
            <div className="flex justify-between"><span>Active students</span><strong className="text-slate-900">{data.before.active_students}</strong></div>
            <div className="flex justify-between"><span>Waiting students</span><strong className="text-slate-900">{data.before.waiting_students}</strong></div>
            <div className="flex justify-between"><span>Participation</span><strong className="text-slate-900">{data.before.participation_percent}%</strong></div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">MOVE360</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Students</span><strong className="text-slate-900">{data.after.students}</strong></div>
            <div className="flex justify-between"><span>Active students</span><strong className="text-slate-900">{data.after.active_students}</strong></div>
            <div className="flex justify-between"><span>Waiting students</span><strong className="text-slate-900">{data.after.waiting_students}</strong></div>
            <div className="flex justify-between"><span>Participation</span><strong className="text-slate-900">{data.after.participation_percent}%</strong></div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm text-slate-500">{data.label}</div>
      </div>
    </div>
  )
}

export default ReportsPage

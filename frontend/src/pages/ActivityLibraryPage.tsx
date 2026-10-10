import { useEffect, useState } from 'react'
import { getActivities } from '../services/api'
import type { Activity } from '../types'

function ActivityLibraryPage() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    getActivities().then(setActivities)
  }, [])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Activity library</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Inclusive activities</h1>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">20+ demo activities</div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {activities.map((activity) => (
          <div key={activity.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xl font-bold text-slate-900">{activity.name}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-emerald-600">{activity.category}</div>
              </div>
              <div className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">{activity.grade_range}</div>
            </div>
            <p className="mt-3 text-sm text-slate-600">{activity.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-500">Skill</span><div className="font-semibold text-slate-900">{activity.skill}</div></div>
              <div><span className="text-slate-500">Equipment</span><div className="font-semibold text-slate-900">{activity.equipment}</div></div>
              <div><span className="text-slate-500">Intensity</span><div className="font-semibold text-slate-900">{activity.intensity}</div></div>
              <div><span className="text-slate-500">Group size</span><div className="font-semibold text-slate-900">{activity.group_size}</div></div>
            </div>
            <div className="mt-4 rounded-xl bg-white p-3 text-sm text-slate-600">
              <div className="font-semibold text-slate-900">Accessibility adaptation</div>
              <div className="mt-2">{activity.accessibility_adaptations}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityLibraryPage

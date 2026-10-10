const classOverview = [
  { label: 'Students', value: '36' },
  { label: 'Active', value: '30' },
  { label: 'Waiting', value: '6' },
  { label: 'Participation', value: '83%' },
]

const supportNeeds = [
  { name: 'Ava', support: 'Shorter routes and visual cues', priority: 'High' },
  { name: 'Noah', support: 'Partner support for ball skills', priority: 'Medium' },
  { name: 'Sophia', support: 'Reduced intensity intervals', priority: 'High' },
  { name: 'Liam', support: 'Broader target zones and slower pace', priority: 'Medium' },
]

const groupPlan = [
  { name: 'Group A', students: '1-6', zone: 'Locomotor lane' },
  { name: 'Group B', students: '7-12', zone: 'Target toss' },
  { name: 'Group C', students: '13-18', zone: 'Balance challenge' },
  { name: 'Group D', students: '19-24', zone: 'Team game' },
  { name: 'Group E', students: '25-30', zone: 'Fitness circuit' },
  { name: 'Group F', students: '31-36', zone: 'Recovery / reflection' },
]

function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Student inclusion</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Students</h1>
          </div>
          <button className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950">Generate support plan</button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {classOverview.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-[0.15em] text-slate-500">{item.label}</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-xl font-bold text-slate-900">Support and access needs</div>
          <div className="space-y-3">
            {supportNeeds.map((student) => (
              <div key={student.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <div className="font-semibold text-slate-900">{student.name}</div>
                  <div className="text-sm text-slate-600">{student.support}</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  student.priority === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {student.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-xl font-bold text-slate-900">Group rotation plan</div>
          <div className="space-y-3">
            {groupPlan.map((group) => (
              <div key={group.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div>
                  <div className="font-semibold text-slate-900">{group.name}</div>
                  <div className="text-sm text-slate-600">{group.students}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-[0.15em] text-slate-500">Zone</div>
                  <div className="font-medium text-slate-900">{group.zone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentsPage

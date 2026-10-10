function SettingsPage() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Settings</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Teacher preferences</h1>
      <div className="mt-6 space-y-4">
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">Safety rules: visible on every activity and session summary.</div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">Participation target: default 85% of class active.</div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">Curriculum mapping: pending verification until official mapping is reviewed.</div>
      </div>
    </div>
  )
}

export default SettingsPage

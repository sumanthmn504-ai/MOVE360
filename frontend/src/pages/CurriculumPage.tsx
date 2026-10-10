import { useEffect, useState } from 'react'
import { getCurriculum } from '../services/api'

function CurriculumPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    getCurriculum().then((result) => setItems(result as any[]))
  }, [])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Curriculum</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Curriculum mapping</h1>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.document_name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900">{item.document_name}</div>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${item.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {item.verified ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              <div><span className="text-slate-500">State</span><div className="font-semibold text-slate-900">{item.state}</div></div>
              <div><span className="text-slate-500">Grade</span><div className="font-semibold text-slate-900">{item.grade}</div></div>
            </div>
            <div className="mt-3 text-slate-600">{item.learning_outcome}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CurriculumPage

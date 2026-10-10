import { useEffect, useState } from 'react'
import { getEquipment } from '../services/api'
import type { EquipmentItem } from '../types'

function EquipmentPage() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([])
  const [mode, setMode] = useState<'light' | 'none'>('light')

  useEffect(() => {
    getEquipment().then((items) => setEquipment([...items].sort((a, b) => Number(b.available) - Number(a.available) || b.quantity - a.quantity)))
  }, [])

  const visibleEquipment = mode === 'none'
    ? equipment.filter((item) => item.available)
    : equipment

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Equipment manager</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Equipment</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => setMode('none')} className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${mode === 'none' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-700'}`}>
            NO EQUIPMENT MODE
          </button>
          <button type="button" onClick={() => setMode('light')} className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${mode === 'light' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 text-slate-700'}`}>
            EQUIPMENT-LIGHT MODE
          </button>
        </div>
      </div>

      <div className="mb-4 text-sm text-slate-500">
        {mode === 'none' ? 'Low-equipment view: showing only available resources for fast planning.' : 'Full equipment view: all kit is displayed for complete session planning.'}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleEquipment.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xl font-bold text-slate-900">{item.name}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-500">{item.category}</div>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${item.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-500">Quantity</span><div className="font-semibold text-slate-900">{item.quantity}</div></div>
              <div><span className="text-slate-500">Condition</span><div className="font-semibold text-slate-900">{item.condition}</div></div>
            </div>
            <div className="mt-4 text-sm text-slate-600">{item.notes}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EquipmentPage

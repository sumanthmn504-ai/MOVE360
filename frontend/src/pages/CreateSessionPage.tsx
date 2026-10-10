import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSession, generateSession } from '../services/api'
import type { SessionForm } from '../types'

const initialState: SessionForm = {
  grade: 5,
  class_name: 'Grade 5 PE',
  student_count: 36,
  duration: 40,
  ground_size: 'Medium',
  location: 'Outdoor',
  objective: 'Increase student active minutes while maintaining inclusivity.',
  intensity: 'Moderate',
  equipment_available: 'Balls, cones, hoops, mats',
  accessibility_considerations: 'Shorter routes, walking options, visual demonstrations.',
  teacher_notes: 'Support students needing reduced intensity or shorter distances.',
}

function CreateSessionPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<SessionForm>(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [draftSaved, setDraftSaved] = useState(false)

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const session = await createSession(form as SessionForm)
    await generateSession(session.id)
    navigate(`/sessions/${session.id}`)
    setIsSubmitting(false)
  }

  const handleSaveDraft = () => {
    localStorage.setItem('move360_session_draft', JSON.stringify(form))
    setDraftSaved(true)
    setTimeout(() => setDraftSaved(false), 1800)
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">Session planner</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Create session</h1>
        </div>
        <button type="button" onClick={handleSaveDraft} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50">
          {draftSaved ? 'Draft saved' : 'Save draft'}
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Grade"><input type="number" min={1} max={10} value={form.grade} onChange={(e) => handleChange('grade', Number(e.target.value))} className="field" /></Field>
        <Field label="Class name"><input value={form.class_name} onChange={(e) => handleChange('class_name', e.target.value)} className="field" /></Field>
        <Field label="Number of students"><input type="number" min={1} value={form.student_count} onChange={(e) => handleChange('student_count', Number(e.target.value))} className="field" /></Field>
        <Field label="Session duration (minutes)"><input type="number" min={10} max={120} value={form.duration} onChange={(e) => handleChange('duration', Number(e.target.value))} className="field" /></Field>
        <Field label="Ground size"><select value={form.ground_size} onChange={(e) => handleChange('ground_size', e.target.value)} className="field"><option>Small</option><option>Medium</option><option>Large</option></select></Field>
        <Field label="Location"><select value={form.location} onChange={(e) => handleChange('location', e.target.value)} className="field"><option>Indoor</option><option>Outdoor</option></select></Field>
        <Field label="Intensity"><select value={form.intensity} onChange={(e) => handleChange('intensity', e.target.value)} className="field"><option>Low</option><option>Moderate</option><option>High</option></select></Field>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="PE objective"><textarea value={form.objective} onChange={(e) => handleChange('objective', e.target.value)} className="field min-h-28" /></Field>
        <Field label="Equipment available"><textarea value={form.equipment_available} onChange={(e) => handleChange('equipment_available', e.target.value)} className="field min-h-24" /></Field>
        <Field label="Accessibility considerations"><textarea value={form.accessibility_considerations} onChange={(e) => handleChange('accessibility_considerations', e.target.value)} className="field min-h-24" /></Field>
        <Field label="Teacher notes"><textarea value={form.teacher_notes} onChange={(e) => handleChange('teacher_notes', e.target.value)} className="field min-h-24" /></Field>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={handleSubmit} disabled={isSubmitting} className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 shadow hover:bg-emerald-400 disabled:opacity-70">
          {isSubmitting ? 'Generating...' : 'GENERATE INCLUSIVE SESSION'}
        </button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span className="mb-2 block">{label}</span>
      {children}
    </label>
  )
}

export default CreateSessionPage

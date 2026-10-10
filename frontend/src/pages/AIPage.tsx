import { useState } from 'react'
import { chatWithAI } from '../services/api'

function AIPage() {
  const [message, setMessage] = useState('I have 40 Grade 6 students and only 4 balls.')
  const [reply, setReply] = useState('')

  const ask = async () => {
    const result = await chatWithAI(message)
    setReply(result.reply || 'No response available.')
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">AI assistant</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Teacher support</h1>
      <div className="mt-6 space-y-4">
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="field min-h-28" />
        <button onClick={ask} className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950">Ask MOVE360 AI</button>
      </div>

      {reply && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          {reply}
        </div>
      )}
    </div>
  )
}

export default AIPage

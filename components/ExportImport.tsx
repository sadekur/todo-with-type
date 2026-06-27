'use client'

import { TodoType } from '@/lib/types'

type Props = { todos: TodoType[]; onImported: () => void }

export default function ExportImport({ todos, onImported }: Props) {
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(todos, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'todos.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const data = JSON.parse(text)
    if (!Array.isArray(data)) return
    const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:5000'
    await Promise.all(data.map((item: Partial<TodoType>) =>
      fetch(`${API_HOST}/api/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: item.title, priority: item.priority, dueDate: item.dueDate, category: item.category }),
      })
    ))
    onImported()
  }

  if (todos.length === 0) return null

  return (
    <div className="mb-4 flex gap-2">
      <button onClick={handleExport}
        className="rounded bg-gray-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-700">
        Export JSON
      </button>
      <label className="cursor-pointer rounded bg-gray-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-700">
        Import JSON
        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
      </label>
    </div>
  )
}

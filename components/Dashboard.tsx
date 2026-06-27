'use client'

import { TodoType } from '@/lib/types'

type Props = { todos: TodoType[] }

export default function Dashboard({ todos }: Props) {
  const total = todos.length
  const completed = todos.filter(t => t.completed).length
  const pct = total ? Math.round((completed / total) * 100) : 0

  const priorityCounts = { high: 0, medium: 0, low: 0 }
  todos.forEach(t => { priorityCounts[t.priority]++ })

  if (total === 0) return null

  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <div className="mb-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
        <span>Progress: {completed}/{total} ({pct}%)</span>
      </div>
      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex gap-4 text-xs">
        {(['high', 'medium', 'low'] as const).map(p => (
          <div key={p} className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <span className={`h-2.5 w-2.5 rounded-full ${p === 'high' ? 'bg-red-400' : p === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`} />
            {p}: {priorityCounts[p]}
          </div>
        ))}
      </div>
    </div>
  )
}

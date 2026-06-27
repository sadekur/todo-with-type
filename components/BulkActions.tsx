'use client'

import { TodoType } from '@/lib/types'
import { updateTodo, deleteTodo } from '@/lib/api'

type Props = {
  todos: TodoType[]
  selected: string[]
  onSelect: (ids: string[]) => void
  onChanged: () => void
}

export default function BulkActions({ todos, selected, onSelect, onChanged }: Props) {
  const allSelected = todos.length > 0 && selected.length === todos.length

  const toggleSelectAll = () => {
    onSelect(allSelected ? [] : todos.map(t => t._id))
  }

  const markSelectedDone = async () => {
    await Promise.all(selected.map(id => updateTodo(id, { completed: true })))
    onSelect([])
    onChanged()
  }

  const deleteSelected = async () => {
    await Promise.all(selected.map(id => deleteTodo(id)))
    onSelect([])
    onChanged()
  }

  if (todos.length === 0) return null

  return (
    <div className="mb-3 flex items-center gap-2 text-xs">
      <label className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
        <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} className="h-3.5 w-3.5" />
        Select all
      </label>
      {selected.length > 0 && (
        <>
          <span className="text-gray-500">{selected.length} selected</span>
          <button onClick={markSelectedDone} className="rounded bg-green-600 px-2 py-1 text-white hover:bg-green-700">Mark done</button>
          <button onClick={deleteSelected} className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700">Delete</button>
        </>
      )}
    </div>
  )
}

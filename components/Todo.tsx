'use client'

import { useState } from 'react'
import { TodoType } from '@/lib/types'
import { updateTodo, deleteTodo } from '@/lib/api'

type Props = { todo: TodoType; onChanged: () => void; onDelete?: (todo: TodoType) => void }

const priorityColors: Record<string, string> = {
  low: 'border-green-400',
  medium: 'border-yellow-400',
  high: 'border-red-400',
}

export default function ToDo({ todo, onChanged, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const isOverdue = todo.dueDate ? new Date(todo.dueDate) < new Date() && !todo.completed : false

  const handleToggle = async () => {
    await updateTodo(todo._id, { completed: !todo.completed })
    onChanged()
  }

  const handleDelete = async () => {
    if (onDelete) {
      onDelete(todo)
    } else {
      await deleteTodo(todo._id)
      onChanged()
    }
  }

  const handleEdit = async () => {
    if (editTitle.trim()) {
      await updateTodo(todo._id, { title: editTitle.trim() })
      onChanged()
    }
    setEditing(false)
  }

  return (
    <article
      className={`mb-2 rounded-lg border-l-4 bg-white p-3 shadow transition hover:shadow-md dark:bg-gray-800 ${isOverdue ? 'border-red-500' : priorityColors[todo.priority]} ${todo.completed ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={todo.completed} onChange={handleToggle}
          className="h-4 w-4 rounded border-gray-300" aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`} />
        {editing ? (
          <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)}
            onBlur={handleEdit} onKeyDown={e => { if (e.key === 'Enter') handleEdit(); if (e.key === 'Escape') setEditing(false) }}
            className="flex-1 rounded border border-blue-400 px-2 py-1 text-sm dark:bg-gray-700 dark:text-white" autoFocus />
        ) : (
          <span onDoubleClick={() => { setEditing(true); setEditTitle(todo.title) }}
            className={`flex-1 cursor-pointer text-sm dark:text-white ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
            {todo.title}
          </span>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          {todo.dueDate && (
            (() => {
              const due = new Date(todo.dueDate)
              const today = new Date()
              const isOverdue = due < today && !todo.completed
              const isToday = due.toDateString() === today.toDateString()
              const isTomorrow = new Date(today.getTime() + 86400000).toDateString() === due.toDateString()
              return (
                <span className={isOverdue ? 'font-bold text-red-500' : isToday ? 'text-orange-500' : ''}>
                  {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : todo.dueDate}
                </span>
              )
            })()
          )}
          <span className="rounded bg-gray-200 px-1.5 py-0.5 dark:bg-gray-700">{todo.category}</span>
        </div>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700" aria-label={`Delete ${todo.title}`}>&times;</button>
      </div>
    </article>
  )
}

'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { TodoType, Filter, SortBy } from '@/lib/types'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '@/lib/api'
import { useKeyboardShortcuts } from '@/lib/useKeyboardShortcuts'
import ToDo from './Todo'
import AddTodo from './AddTodo'
import DarkModeToggle from './DarkModeToggle'
import BulkActions from './BulkActions'
import Dashboard from './Dashboard'
import ExportImport from './ExportImport'
import HelpModal from './HelpModal'
import Toast from './Toast'

export default function Todos() {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('createdAt')
  const [selected, setSelected] = useState<string[]>([])
  const [helpOpen, setHelpOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; deleted: TodoType | null } | null>(null)

  const load = useCallback(async () => {
    const data = await fetchTodos()
    setTodos(data)
    setSelected([])
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = useMemo(() => {
    let list = [...todos]
    if (filter === 'active') list = list.filter(t => !t.completed)
    if (filter === 'completed') list = list.filter(t => t.completed)
    if (search) list = list.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    if (sortBy === 'title') list.sort((a, b) => a.title.localeCompare(b.title))
    else if (sortBy === 'priority') {
      const rank = { high: 0, medium: 1, low: 2 }
      list.sort((a, b) => rank[a.priority] - rank[b.priority])
    }
    else list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return list
  }, [todos, filter, search, sortBy])

  const stats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }), [todos])

  const clearCompleted = async () => {
    const done = todos.filter(t => t.completed)
    await Promise.all(done.map(t => deleteTodo(t._id)))
    load()
  }

  const handleDelete = async (todo: TodoType) => {
    await deleteTodo(todo._id)
    setToast({ message: `"${todo.title}" deleted`, deleted: todo })
    load()
  }

  const handleUndo = async () => {
    if (!toast?.deleted) return
    await createTodo(toast.deleted)
    setToast(null)
    load()
  }

  useKeyboardShortcuts({
    n: () => { (document.querySelector('[data-focus="add-todo"]') as HTMLInputElement)?.focus() },
    '/': () => { (document.querySelector('[data-focus="search"]') as HTMLInputElement)?.focus() },
    '?': () => setHelpOpen(true),
  })

  const SearchBar = (
    <input type="text" value={search} onChange={e => setSearch(e.target.value)}
      placeholder="Search (press / to focus)..."
      data-focus="search"
      className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
  )

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Todo App</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setHelpOpen(true)}
            className="rounded-lg bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700 dark:text-white">?</button>
          <DarkModeToggle />
        </div>
      </div>

      <Dashboard todos={todos} />
      <AddTodo onAdded={load} />

      <div className="mb-4 flex flex-wrap gap-2">
        {SearchBar}
        {(['all', 'active', 'completed'] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded px-3 py-1.5 text-xs font-medium ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <select value={sortBy} onChange={e => setSortBy(e.target.value as SortBy)}
          className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white">
          <option value="createdAt">Date</option>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
        {stats.total} total &middot; {stats.active} active &middot; {stats.completed} completed
        {stats.completed > 0 && (
          <button onClick={clearCompleted} className="ml-2 text-red-500 hover:underline">Clear completed</button>
        )}
      </div>

      <BulkActions todos={todos} selected={selected} onSelect={setSelected} onChanged={load} />
      <ExportImport todos={todos} onImported={load} />

      {filtered.map(todo => (
        <ToDo key={todo._id} todo={todo} onChanged={load} onDelete={handleDelete} />
      ))}

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-gray-400 dark:text-gray-500">No todos match your criteria.</p>
      )}

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      <Toast
        message={toast?.message ?? ''}
        visible={toast !== null}
        onUndo={handleUndo}
        onClose={() => setToast(null)}
      />
    </div>
  )
}

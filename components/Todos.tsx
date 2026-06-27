'use client'

import { useState, useEffect, useMemo } from 'react'
import { TodoType, Filter, SortBy } from '@/lib/types'
import { fetchTodos, updateTodo, deleteTodo } from '@/lib/api'
import ToDo from './Todo'
import AddTodo from './AddTodo'

export default function Todos() {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortBy>('createdAt')

  const load = async () => {
    const data = await fetchTodos()
    setTodos(data)
  }

  useEffect(() => { load() }, [])

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

  const completedCount = useMemo(() => stats.completed, [stats.completed])

  const clearCompleted = async () => {
    const done = todos.filter(t => t.completed)
    await Promise.all(done.map(t => deleteTodo(t._id)))
    load()
  }

  const activeSort = sortBy

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold dark:text-white">Todo App</h1>

      <AddTodo onAdded={load} />

      <div className="mb-4 flex flex-wrap gap-2">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white" />

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
        {completedCount > 0 && (
          <button onClick={clearCompleted} className="ml-2 text-red-500 hover:underline">Clear completed</button>
        )}
      </div>

      {filtered.map(todo => (
        <ToDo key={todo._id} todo={todo} onChanged={load} />
      ))}

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-gray-400 dark:text-gray-500">No todos match your criteria.</p>
      )}
    </div>
  )
}

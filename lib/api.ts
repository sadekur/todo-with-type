import { TodoType } from './types'

const BASE = '/api/todos'

export async function fetchTodos(): Promise<TodoType[]> {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}

export async function createTodo(data: Partial<TodoType>): Promise<TodoType> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create')
  return res.json()
}

export async function updateTodo(id: string, data: Partial<TodoType>): Promise<TodoType> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update')
  return res.json()
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete')
}

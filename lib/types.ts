export type TodoType = {
  _id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate: string | null
  category: string
  createdAt: string
}

export type Filter = 'all' | 'active' | 'completed'
export type SortBy = 'createdAt' | 'title' | 'priority'

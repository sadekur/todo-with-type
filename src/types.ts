export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: number;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  category: string;
}

export type Filter = 'all' | 'active' | 'completed';

export type SortBy = 'createdAt' | 'title' | 'priority';

export type TodoAction =
  | { type: 'ADD'; payload: Omit<TodoType, 'id' | 'createdAt' | 'completed'> }
  | { type: 'DELETE'; payload: number }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'EDIT'; payload: { id: number; title: string } }
  | { type: 'REORDER'; payload: TodoType[] }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET'; payload: TodoType[] };

export type TodoState = {
  todos: TodoType[];
  filter: Filter;
  search: string;
  sortBy: SortBy;
};

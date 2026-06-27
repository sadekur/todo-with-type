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
  | { type: 'SET'; payload: TodoType[] }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SORT'; payload: SortBy }
  | { type: 'UNDO_DELETE' }
  | { type: 'DISMISS_UNDO' }
  | { type: 'BULK_DELETE'; payload: number[] }
  | { type: 'BULK_TOGGLE'; payload: number[]; completed: boolean }
  | { type: 'TOGGLE_SELECT'; payload: number }
  | { type: 'SELECT_ALL' }
  | { type: 'CLEAR_SELECTION' };

export type TodoState = {
  todos: TodoType[];
  filter: Filter;
  search: string;
  sortBy: SortBy;
  lastDeleted: TodoType | null;
  selectedIds: number[];
};

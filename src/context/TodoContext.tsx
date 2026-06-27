import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TodoType, TodoAction, TodoState } from '../types';

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  search: '',
  sortBy: 'createdAt',
  lastDeleted: null,
  selectedIds: [],
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD': {
      const newTodo: TodoType = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
        createdAt: Date.now(),
        priority: action.payload.priority,
        dueDate: action.payload.dueDate,
        category: action.payload.category,
      };
      return { ...state, todos: [newTodo, ...state.todos] };
    }
    case 'DELETE': {
      const deleted = state.todos.find(t => t.id === action.payload) || null;
      return { ...state, todos: state.todos.filter(t => t.id !== action.payload), lastDeleted: deleted };
    }
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'EDIT':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id ? { ...t, title: action.payload.title } : t
        ),
      };
    case 'REORDER':
      return { ...state, todos: action.payload };
    case 'CLEAR_COMPLETED':
      return { ...state, todos: state.todos.filter(t => !t.completed) };
    case 'SET':
      return { ...state, todos: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'UNDO_DELETE':
      if (!state.lastDeleted) return state;
      return {
        ...state,
        todos: [state.lastDeleted, ...state.todos],
        lastDeleted: null,
      };
    case 'DISMISS_UNDO':
      return { ...state, lastDeleted: null };
    case 'BULK_DELETE':
      return { ...state, todos: state.todos.filter(t => !action.payload.includes(t.id)) };
    case 'BULK_TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t =>
          action.payload.includes(t.id) ? { ...t, completed: action.completed } : t
        ),
      };
    case 'TOGGLE_SELECT': {
      const exists = state.selectedIds.includes(action.payload);
      return {
        ...state,
        selectedIds: exists
          ? state.selectedIds.filter(id => id !== action.payload)
          : [...state.selectedIds, action.payload],
      };
    }
    case 'SELECT_ALL': {
      const visibleIds = state.todos
        .filter(t => {
          if (state.filter === 'active') return !t.completed;
          if (state.filter === 'completed') return t.completed;
          return true;
        })
        .filter(t => t.title.toLowerCase().includes(state.search.toLowerCase()))
        .map(t => t.id);
      const allSelected = visibleIds.every(id => state.selectedIds.includes(id));
      return {
        ...state,
        selectedIds: allSelected ? [] : visibleIds,
      };
    }
    case 'CLEAR_SELECTION':
      return { ...state, selectedIds: [] };
    default:
      return state;
  }
}

type TodoContextValue = {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
};

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodo must be used within TodoProvider');
  return ctx;
}

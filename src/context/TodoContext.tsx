import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TodoType, TodoAction, TodoState } from '../types';

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  search: '',
  sortBy: 'createdAt',
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
    case 'DELETE':
      return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };
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

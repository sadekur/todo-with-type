import { useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import { TodoType } from '../types';

const STORAGE_KEY = 'todo-with-type';

export function useLocalStorage() {
  const { state, dispatch } = useTodo();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const todos: TodoType[] = JSON.parse(stored);
        dispatch({ type: 'SET', payload: todos });
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
    } catch {
    }
  }, [state.todos]);
}

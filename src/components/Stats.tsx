import React from 'react';
import { useTodo } from '../context/TodoContext';

const Stats = () => {
  const { state, dispatch } = useTodo();
  const total = state.todos.length;
  const active = state.todos.filter(t => !t.completed).length;
  const completed = state.todos.filter(t => t.completed).length;

  if (total === 0) return null;

  return (
    <div className="mb-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
      <span>{total} total</span>
      <span className="text-blue-600">{active} active</span>
      <span className="text-green-600">{completed} completed</span>
      {completed > 0 && (
        <button
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
        >
          Clear completed
        </button>
      )}
    </div>
  );
};

export default Stats;

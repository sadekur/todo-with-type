import React from 'react';
import { useTodo } from '../context/TodoContext';

const BulkActions = () => {
  const { state, dispatch } = useTodo();
  const count = state.selectedIds.length;
  if (count === 0) return null;

  return (
    <div className="mb-4 flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-2 dark:bg-blue-900/30">
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {count} selected
      </span>
      <button
        onClick={() => dispatch({ type: 'SELECT_ALL' })}
        className="text-xs text-blue-600 hover:underline dark:text-blue-400"
      >
        {state.selectedIds.length === state.todos.filter(t =>
          state.filter === 'all' ? true : state.filter === 'active' ? !t.completed : t.completed
        ).length ? 'Deselect all' : 'Select all'}
      </button>
      <div className="ml-auto flex gap-2">
        <button
          onClick={() => dispatch({ type: 'BULK_TOGGLE', payload: state.selectedIds, completed: true })}
          className="rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
        >
          Mark done
        </button>
        <button
          onClick={() => dispatch({ type: 'BULK_DELETE', payload: state.selectedIds })}
          className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BulkActions;

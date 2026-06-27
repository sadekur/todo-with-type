import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const Stats = () => {
  const { state, dispatch } = useTodo();
  const [confirm, setConfirm] = useState(false);
  const total = state.todos.length;
  const active = state.todos.filter(t => !t.completed).length;
  const completed = state.todos.filter(t => t.completed).length;

  if (total === 0) return null;

  const handleClear = () => {
    if (!confirm) { setConfirm(true); return; }
    dispatch({ type: 'CLEAR_COMPLETED' });
    setConfirm(false);
  };

  return (
    <div className="mb-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
      <span>{total} total</span>
      <span className="text-blue-600">{active} active</span>
      <span className="text-green-600">{completed} completed</span>
      {completed > 0 && (
        <div className="flex gap-2">
          {confirm && (
            <button onClick={() => setConfirm(false)} className="text-xs text-gray-500 hover:underline dark:text-gray-400">
              Cancel
            </button>
          )}
          <button
            onClick={handleClear}
            className={`rounded px-2 py-0.5 text-xs ${confirm ? 'bg-red-800 text-white' : 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300'}`}
          >
            {confirm ? 'Confirm?' : 'Clear completed'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Stats;

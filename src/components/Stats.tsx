import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const Stats = () => {
  const { state, dispatch } = useTodo();
  const [confirmClear, setConfirmClear] = useState(false);
  const total = state.todos.length;
  const active = state.todos.filter(t => !t.completed).length;
  const completed = state.todos.filter(t => t.completed).length;

  if (total === 0) return null;

  const handleClear = () => {
    if (!confirmClear) { setConfirmClear(true); return; }
    dispatch({ type: 'CLEAR_COMPLETED' });
    setConfirmClear(false);
  };

  const allCompleted = total === completed;

  return (
    <div className="mb-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
      <span>{total} total</span>
      <span className="text-blue-600">{active} active</span>
      <span className="text-green-600">{completed} completed</span>
      <div className="flex gap-2">
        {!allCompleted && active > 0 && (
          <button
            onClick={() => {
              const ids = state.todos.filter(t => !t.completed).map(t => t.id);
              dispatch({ type: 'BULK_TOGGLE', payload: ids, completed: true });
            }}
            className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
          >
            Mark all done
          </button>
        )}
        {completed > 0 && (
          <>
            {confirmClear && (
              <button onClick={() => setConfirmClear(false)} className="text-xs text-gray-500 hover:underline dark:text-gray-400">
                Cancel
              </button>
            )}
            <button
              onClick={handleClear}
              className={`rounded px-2 py-0.5 text-xs ${confirmClear ? 'bg-red-800 text-white' : 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300'}`}
            >
              {confirmClear ? 'Confirm?' : 'Clear completed'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Stats;

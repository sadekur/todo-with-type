import React from 'react';
import { useTodo } from '../context/TodoContext';
import { Filter } from '../types';

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

const FilterBar = () => {
  const { state, dispatch } = useTodo();

  return (
    <div className="mb-4 flex gap-2">
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: f.value })}
          aria-label={`Filter: ${f.label}`}
          className={`rounded px-3 py-1 text-sm font-medium transition ${
            state.filter === f.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;

import React from 'react';
import { useTodo } from '../context/TodoContext';
import { SortBy } from '../types';

const options: { label: string; value: SortBy }[] = [
  { label: 'Newest', value: 'createdAt' },
  { label: 'Title', value: 'title' },
  { label: 'Priority', value: 'priority' },
];

const SortSelector = () => {
  const { state, dispatch } = useTodo();

  return (
    <select
      value={state.sortBy}
      onChange={e => dispatch({ type: 'SET_SORT', payload: e.target.value as SortBy })}
      className="rounded border border-gray-300 px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
};

export default SortSelector;

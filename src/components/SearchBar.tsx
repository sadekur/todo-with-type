import React from 'react';
import { useTodo } from '../context/TodoContext';

const SearchBar = () => {
  const { state, dispatch } = useTodo();

  return (
    <input
      type="text"
      value={state.search}
      onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
      placeholder="Search todos... (/)"
      data-focus="search"
      className="mb-4 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    />
  );
};

export default SearchBar;

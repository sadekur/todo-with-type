import React from 'react';
import { useTodo } from '../context/TodoContext';

const SearchBar = () => {
  const { state, dispatch } = useTodo();

  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={state.search}
        onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
        placeholder="Search todos... (/)"
        data-focus="search"
        className="w-full rounded border border-gray-300 px-3 py-2 pr-8 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      {state.search && (
        <button
          onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBar;

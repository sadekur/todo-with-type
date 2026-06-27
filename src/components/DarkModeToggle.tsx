import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const DarkModeToggle = () => {
  const { dark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className="rounded-lg bg-gray-200 p-2 text-sm transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      aria-label="Toggle dark mode"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;

import React from 'react';

const ShortcutHint = () => (
  <div className="mb-4 text-center text-xs text-gray-400 dark:text-gray-500">
    <kbd className="rounded border border-gray-300 px-1 dark:border-gray-600">N</kbd> add &middot;
    <kbd className="ml-1 rounded border border-gray-300 px-1 dark:border-gray-600">/</kbd> search &middot;
    <kbd className="ml-1 rounded border border-gray-300 px-1 dark:border-gray-600">?</kbd> help
  </div>
);

export default ShortcutHint;

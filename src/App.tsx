import React, { useMemo } from 'react';
import { TodoProvider } from './context/TodoContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import AddTodo from './components/AddTodo';
import BulkActions from './components/BulkActions';
import Dashboard from './components/Dashboard';
import DarkModeToggle from './components/DarkModeToggle';
import ExportImport from './components/ExportImport';
import ShortcutHint from './components/ShortcutHint';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import SortSelector from './components/SortSelector';
import Stats from './components/Stats';
import Toast from './components/Toast';
import Todos from './components/Todos';

function AppContent() {
  useLocalStorage();
  const shortcuts = useMemo(() => ({
    n: () => {
      const input = document.querySelector<HTMLInputElement>('[data-focus="add-todo"]');
      input?.focus();
    },
    '/': () => {
      const input = document.querySelector<HTMLInputElement>('[data-focus="search"]');
      input?.focus();
      input?.select();
    },
  }), []);
  useKeyboardShortcuts(shortcuts);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Todo App</h1>
          <DarkModeToggle />
        </div>
        <AddTodo />
        <ExportImport />
        <ShortcutHint />
        <Dashboard />
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <FilterBar />
          <SortSelector />
        </div>
        <SearchBar />
        <BulkActions />
        <Stats />
        <Todos />
        <Toast />
      </div>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

export default App;

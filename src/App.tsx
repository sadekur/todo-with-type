import React, { useMemo, useState } from 'react';
import { TodoProvider } from './context/TodoContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import AddTodo from './components/AddTodo';
import BulkActions from './components/BulkActions';
import Dashboard from './components/Dashboard';
import DarkModeToggle from './components/DarkModeToggle';
import ErrorBoundary from './components/ErrorBoundary';
import ExportImport from './components/ExportImport';
import HelpModal from './components/HelpModal';
import ShortcutHint from './components/ShortcutHint';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import SortSelector from './components/SortSelector';
import Stats from './components/Stats';
import Toast from './components/Toast';
import Todos from './components/Todos';

function AppContent() {
  useLocalStorage();
  const [helpOpen, setHelpOpen] = useState(false);
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
    '?': () => setHelpOpen(v => !v),
    Escape: () => setHelpOpen(false),
  }), []);
  useKeyboardShortcuts(shortcuts);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Todo App</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
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
        <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      </div>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </TodoProvider>
  );
}

export default App;

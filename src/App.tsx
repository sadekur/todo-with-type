import React from 'react';
import { TodoProvider } from './context/TodoContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import AddTodo from './components/AddTodo';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import SortSelector from './components/SortSelector';
import Stats from './components/Stats';
import Todos from './components/Todos';

function AppContent() {
  useLocalStorage();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">
          Todo App
        </h1>
        <AddTodo />
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <FilterBar />
          <SortSelector />
        </div>
        <SearchBar />
        <Stats />
        <Todos />
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

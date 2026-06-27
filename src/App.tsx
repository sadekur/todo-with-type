import React from 'react';
import { TodoProvider } from './context/TodoContext';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">
            Todo App
          </h1>
          <AddTodo />
          <Todos />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

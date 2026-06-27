import React from 'react';
import ToDo from './Todo';
import { useTodo } from '../context/TodoContext';

const Todos = () => {
  const { state } = useTodo();
  const { todos, filter, search, sortBy } = state;

  const filtered = todos
    .filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      return b.createdAt - a.createdAt;
    });

  if (filtered.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        {todos.length === 0 ? 'No todos yet. Add one above!' : 'No todos match your filter.'}
      </div>
    );
  }

  return (
    <div>
      {filtered.map(todo => (
        <ToDo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;

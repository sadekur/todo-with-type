import React, { useCallback, useMemo, useRef } from 'react';
import ToDo from './Todo';
import { useTodo } from '../context/TodoContext';

const Todos = () => {
  const { state, dispatch } = useTodo();
  const { todos, filter, search, sortBy } = state;
  const dragItem = useRef<number | null>(null);

  const filtered = useMemo(() => todos
    .filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'createdAt') return b.createdAt - a.createdAt;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      return 0;
    }), [todos, filter, search, sortBy]);

  const handleDragStart = useCallback((id: number) => {
    dragItem.current = id;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, id: number) => {
    e.preventDefault();
    if (dragItem.current === null || dragItem.current === id) return;
    const fromIndex = todos.findIndex(t => t.id === dragItem.current);
    const toIndex = todos.findIndex(t => t.id === id);
    if (fromIndex === -1 || toIndex === -1) return;
    const reordered = [...todos];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    dragItem.current = id;
    dispatch({ type: 'REORDER', payload: reordered });
  }, [todos, dispatch]);

  const handleDragEnd = useCallback(() => {
    dragItem.current = null;
  }, []);

  if (filtered.length === 0) {
    const messages: Record<string, string> = {
      all: 'No todos yet. Add one above!',
      active: 'No active todos. Great job!',
      completed: 'No completed todos yet.',
    };
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        {todos.length === 0 ? messages.all : messages[filter]}
      </div>
    );
  }

  if (filter !== 'all') {
    return (
      <div>
        {filtered.map((todo, i) => (
          <div
            key={todo.id}
            draggable={sortBy === 'createdAt'}
            onDragStart={() => handleDragStart(todo.id)}
            onDragOver={e => handleDragOver(e, todo.id)}
            onDragEnd={handleDragEnd}
            className="animate-fadeIn"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <ToDo todo={todo} />
          </div>
        ))}
      </div>
    );
  }

  const activeTodos = filtered.filter(t => !t.completed);
  const completedTodos = filtered.filter(t => t.completed);

  return (
    <div>
      {activeTodos.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Active</h3>
          {activeTodos.map((todo, i) => (
            <div key={todo.id} draggable={sortBy === 'createdAt'} onDragStart={() => handleDragStart(todo.id)} onDragOver={e => handleDragOver(e, todo.id)} onDragEnd={handleDragEnd} className="animate-fadeIn" style={{ animationDelay: `${i * 30}ms` }}>
              <ToDo todo={todo} />
            </div>
          ))}
        </div>
      )}
      {completedTodos.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Completed</h3>
          {completedTodos.map((todo, i) => (
            <div key={todo.id} draggable={sortBy === 'createdAt'} onDragStart={() => handleDragStart(todo.id)} onDragOver={e => handleDragOver(e, todo.id)} onDragEnd={handleDragEnd} className="animate-fadeIn" style={{ animationDelay: `${i * 30}ms` }}>
              <ToDo todo={todo} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Todos;

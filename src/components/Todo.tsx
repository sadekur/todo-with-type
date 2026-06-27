import React, { useState } from 'react';
import { TodoType } from '../types';
import { useTodo } from '../context/TodoContext';

type Props = {
  todo: TodoType;
};

const priorityColors = {
  low: 'border-green-400',
  medium: 'border-yellow-400',
  high: 'border-red-400',
};

const ToDo = ({ todo }: Props) => {
  const { state, dispatch } = useTodo();
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const selected = state.selectedIds.includes(todo.id);

  const handleToggle = () => dispatch({ type: 'TOGGLE', payload: todo.id });
  const handleDelete = () => dispatch({ type: 'DELETE', payload: todo.id });

  const handleEdit = () => {
    if (editTitle.trim()) {
      dispatch({ type: 'EDIT', payload: { id: todo.id, title: editTitle.trim() } });
    }
    setEditing(false);
  };

  return (
    <article
      className={`mb-2 rounded-lg border-l-4 bg-white p-3 shadow transition dark:bg-gray-800 ${priorityColors[todo.priority]} ${todo.completed ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => dispatch({ type: 'TOGGLE_SELECT', payload: todo.id })}
          className="h-4 w-4 rounded border-gray-300"
          title="Select for bulk action"
        />
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="h-4 w-4 rounded border-gray-300"
        />
        {editing ? (
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={e => { if (e.key === 'Enter') handleEdit(); if (e.key === 'Escape') setEditing(false); }}
            className="flex-1 rounded border border-blue-400 px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={() => { setEditing(true); setEditTitle(todo.title); }}
            className={`flex-1 cursor-pointer text-sm dark:text-white ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}
          >
            {todo.title}
          </span>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          {todo.dueDate && (
            <span className={new Date(todo.dueDate) < new Date() && !todo.completed ? 'font-bold text-red-500' : ''}>
              {todo.dueDate}
            </span>
          )}
          <span className="rounded bg-gray-200 px-1.5 py-0.5 dark:bg-gray-700">{todo.category}</span>
        </div>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">&times;</button>
      </div>
    </article>
  );
};

export default ToDo;

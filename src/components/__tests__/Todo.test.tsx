import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider } from '../../context/TodoContext';
import ToDo from '../Todo';

const mockTodo = {
  id: 1,
  title: 'Test Todo',
  completed: false,
  createdAt: Date.now(),
  priority: 'medium' as const,
  dueDate: null,
  category: 'personal',
};

beforeEach(() => localStorage.clear());

test('renders todo title and delete button', () => {
  render(
    <TodoProvider>
      <ToDo todo={mockTodo} />
    </TodoProvider>
  );
  expect(screen.getByText('Test Todo')).toBeInTheDocument();
  expect(screen.getByText('\u00D7')).toBeInTheDocument();
});

test('shows category badge', () => {
  render(
    <TodoProvider>
      <ToDo todo={mockTodo} />
    </TodoProvider>
  );
  expect(screen.getByText('personal')).toBeInTheDocument();
});

test('double-click enters edit mode', () => {
  render(
    <TodoProvider>
      <ToDo todo={mockTodo} />
    </TodoProvider>
  );
  fireEvent.doubleClick(screen.getByText('Test Todo'));
  expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
});

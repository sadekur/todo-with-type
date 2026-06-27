import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider } from '../../context/TodoContext';
import AddTodo from '../AddTodo';

beforeEach(() => localStorage.clear());

test('renders AddTodo form', () => {
  render(
    <TodoProvider>
      <AddTodo />
    </TodoProvider>
  );
  expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
  expect(screen.getByText('Add')).toBeInTheDocument();
});

test('allows typing and submitting', () => {
  render(
    <TodoProvider>
      <AddTodo />
    </TodoProvider>
  );
  const input = screen.getByPlaceholderText('Add a new todo...') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'New task' } });
  expect(input.value).toBe('New task');
  fireEvent.click(screen.getByText('Add'));
  expect(input.value).toBe('');
});

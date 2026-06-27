import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoProvider } from '../../context/TodoContext';
import Todos from '../Todos';

beforeEach(() => localStorage.clear());

test('shows empty state when no todos', () => {
  render(
    <TodoProvider>
      <Todos />
    </TodoProvider>
  );
  expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
});

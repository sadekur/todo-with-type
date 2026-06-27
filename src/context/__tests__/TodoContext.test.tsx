import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider, useTodo } from '../TodoContext';

function TestConsumer() {
  const { state, dispatch } = useTodo();
  return (
    <div>
      <span data-testid="count">{state.todos.length}</span>
      <span data-testid="filter">{state.filter}</span>
      <span data-testid="selected">{state.selectedIds.length}</span>
      <button onClick={() => dispatch({ type: 'ADD', payload: { title: 'test', priority: 'low', dueDate: null, category: 'personal' } })}>
        Add
      </button>
      <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>Filter</button>
      <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>Clear</button>
      <button onClick={() => dispatch({ type: 'TOGGLE_SELECT', payload: 1 })}>Select</button>
    </div>
  );
}

beforeEach(() => localStorage.clear());

test('adds a todo', () => {
  render(
    <TodoProvider>
      <TestConsumer />
    </TodoProvider>
  );
  expect(screen.getByTestId('count').textContent).toBe('0');
  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByTestId('count').textContent).toBe('1');
});

test('sets filter', () => {
  render(
    <TodoProvider>
      <TestConsumer />
    </TodoProvider>
  );
  expect(screen.getByTestId('filter').textContent).toBe('all');
  fireEvent.click(screen.getByText('Filter'));
  expect(screen.getByTestId('filter').textContent).toBe('completed');
});

test('toggles selection', () => {
  render(
    <TodoProvider>
      <TestConsumer />
    </TodoProvider>
  );
  expect(screen.getByTestId('selected').textContent).toBe('0');
  fireEvent.click(screen.getByText('Select'));
  expect(screen.getByTestId('selected').textContent).toBe('1');
});

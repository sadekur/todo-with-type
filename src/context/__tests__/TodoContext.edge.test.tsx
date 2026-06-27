import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoProvider, useTodo } from '../TodoContext';

function TestEdge() {
  const { state, dispatch } = useTodo();
  return (
    <div>
      <span data-testid="count">{state.todos.length}</span>
      <span data-testid="filter">{state.filter}</span>
      <span data-testid="sort">{state.sortBy}</span>
      <span data-testid="search">{state.search}</span>
      <button onClick={() => dispatch({ type: 'ADD', payload: { title: 'A', priority: 'high', dueDate: '2099-01-01', category: 'work' } })}>Add</button>
      <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}>Active</button>
      <button onClick={() => dispatch({ type: 'SET_SORT', payload: 'title' })}>Sort Title</button>
      <button onClick={() => dispatch({ type: 'SET_SEARCH', payload: 'test' })}>Search</button>
      <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>Clear</button>
    </div>
  );
}

beforeEach(() => localStorage.clear());

test('set filter updates filter state', () => {
  render(<TodoProvider><TestEdge /></TodoProvider>);
  expect(screen.getByTestId('filter').textContent).toBe('all');
  fireEvent.click(screen.getByText('Active'));
  expect(screen.getByTestId('filter').textContent).toBe('active');
});

test('set sort updates sortBy state', () => {
  render(<TodoProvider><TestEdge /></TodoProvider>);
  expect(screen.getByTestId('sort').textContent).toBe('createdAt');
  fireEvent.click(screen.getByText('Sort Title'));
  expect(screen.getByTestId('sort').textContent).toBe('title');
});

test('set search updates search state', () => {
  render(<TodoProvider><TestEdge /></TodoProvider>);
  expect(screen.getByTestId('search').textContent).toBe('');
  fireEvent.click(screen.getByText('Search'));
  expect(screen.getByTestId('search').textContent).toBe('test');
});

test('clear completed removes nothing when no todos completed', () => {
  render(<TodoProvider><TestEdge /></TodoProvider>);
  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByTestId('count').textContent).toBe('1');
  fireEvent.click(screen.getByText('Clear'));
  expect(screen.getByTestId('count').textContent).toBe('1');
});

test('add two todos and verify count', () => {
  render(<TodoProvider><TestEdge /></TodoProvider>);
  fireEvent.click(screen.getByText('Add'));
  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByTestId('count').textContent).toBe('2');
});

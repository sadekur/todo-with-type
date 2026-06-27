import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

beforeEach(() => localStorage.clear());

test('renders app title', () => {
  render(<App />);
  expect(screen.getByText('Todo App')).toBeInTheDocument();
});

test('renders AddTodo input', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
});

test('shows empty state', () => {
  render(<App />);
  expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
});

test('adds a todo via the form', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Add a new todo...');
  fireEvent.change(input, { target: { value: 'Integration test' } });
  fireEvent.click(screen.getByText('Add'));
  expect(screen.getByText('Integration test')).toBeInTheDocument();
});

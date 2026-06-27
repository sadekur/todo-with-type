import React from 'react';
import { useTodo } from '../context/TodoContext';

const priorityCounts = (todos: { priority: string; completed: boolean }[]) => {
  const counts = { high: { total: 0, done: 0 }, medium: { total: 0, done: 0 }, low: { total: 0, done: 0 } };
  for (const t of todos) {
    const key = t.priority as keyof typeof counts;
    counts[key].total++;
    if (t.completed) counts[key].done++;
  }
  return counts;
};

const Dashboard = () => {
  const { state } = useTodo();
  const { todos } = state;
  if (todos.length === 0) return null;

  const total = todos.length;
  const done = todos.filter(t => t.completed).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const counts = priorityCounts(todos);

  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow dark:bg-gray-800">
      <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Dashboard</h2>
      <div className="mb-3">
        <div className="mb-1 flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>Progress</span>
          <span>{done}/{total} ({pct}%)</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        {(['high', 'medium', 'low'] as const).map(p => (
          <div key={p} className="rounded bg-gray-50 p-2 dark:bg-gray-700">
            <div className={`font-semibold ${p === 'high' ? 'text-red-500' : p === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
              {p}
            </div>
            <div className="text-gray-600 dark:text-gray-400">{counts[p].done}/{counts[p].total}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

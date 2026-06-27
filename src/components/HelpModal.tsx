import React from 'react';

type Props = { open: boolean; onClose: () => void };

const shortcuts = [
  { key: 'N', desc: 'Focus add todo input' },
  { key: '/', desc: 'Focus search input' },
  { key: 'Esc', desc: 'Blur current input / cancel edit' },
  { key: '?', desc: 'Toggle this help modal' },
  { key: 'Esc', desc: 'Close this help modal' },
];

const HelpModal = ({ open, onClose }: Props) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-80 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800" onClick={e => e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Keyboard Shortcuts</h2>
        <ul className="space-y-2">
          {shortcuts.map(s => (
            <li key={s.key} className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{s.desc}</span>
              <kbd className="rounded border border-gray-300 px-2 text-xs dark:border-gray-600 dark:text-gray-300">{s.key}</kbd>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 w-full rounded bg-blue-600 py-2 text-sm text-white hover:bg-blue-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default HelpModal;

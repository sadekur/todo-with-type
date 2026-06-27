'use client'

import { useEffect } from 'react'

type Props = { open: boolean; onClose: () => void }

const shortcuts = [
  { key: 'N', action: 'Focus add-todo input' },
  { key: '/', action: 'Focus search input' },
  { key: '?', action: 'Toggle this help modal' },
  { key: 'Esc', action: 'Close help modal / cancel edit' },
]

export default function HelpModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-80 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800" onClick={e => e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-bold dark:text-white">Keyboard Shortcuts</h2>
        <table className="w-full text-sm">
          <tbody>
            {shortcuts.map(s => (
              <tr key={s.key} className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2 font-mono text-blue-600 dark:text-blue-400">{s.key}</td>
                <td className="py-2 text-gray-600 dark:text-gray-300">{s.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}
          className="mt-4 w-full rounded bg-gray-200 px-3 py-2 text-sm dark:bg-gray-700 dark:text-white">
          Close
        </button>
      </div>
    </div>
  )
}

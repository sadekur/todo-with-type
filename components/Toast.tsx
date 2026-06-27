'use client'

import { useEffect } from 'react'

type Props = {
  message: string
  visible: boolean
  onUndo: () => void
  onClose: () => void
}

export default function Toast({ message, visible, onUndo, onClose }: Props) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-sm text-white shadow-lg dark:bg-gray-900">
      <span>{message}</span>
      <button onClick={onUndo} className="font-medium text-blue-400 hover:text-blue-300">Undo</button>
      <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
    </div>
  )
}

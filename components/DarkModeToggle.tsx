'use client'

import { useState, useEffect } from 'react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('darkMode')
    const isDark = stored === 'true' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('darkMode', String(next))
  }

  return (
    <button onClick={toggle}
      className="rounded-lg bg-gray-200 p-2 text-sm transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      aria-label="Toggle dark mode">
      {dark ? '☀️' : '🌙'}
    </button>
  )
}

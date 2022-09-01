import { useEffect } from 'react'

import create from 'zustand'

interface ThemeStore {
  theme: string
  setTheme: (theme: string) => void
}

const useTheme = create<ThemeStore>((set) => ({
  theme: 'light',
  setTheme: (theme: string) => set({ theme }),
}))

export const useThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setTheme('dark')
      document.querySelector('html').classList.add('dark')
    } else {
      document.querySelector('html').classList.remove('dark')
    }
  }, [setTheme])

  const themeToggleHandler = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.theme = newTheme
    const mainHTML = document.querySelector('html')
    mainHTML.classList.toggle('dark')
  }

  return {
    theme,
    setTheme,
    themeToggleHandler,
  }
}

export default useTheme

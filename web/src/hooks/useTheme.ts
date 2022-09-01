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

  return {
    theme,
    setTheme,
  }
}

export default useTheme

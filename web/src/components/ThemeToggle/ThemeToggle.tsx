/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { BsSun, BsMoon } from 'react-icons/bs'

import { useThemeToggle } from 'src/hooks/useTheme'

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeToggle()
  const themeToggleHandler = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.theme = newTheme
    const mainHTML = document.querySelector('html')
    mainHTML.classList.toggle('dark')
  }

  return (
    <div
      className="flex items-center justify-center w-8 h-7"
      onClick={themeToggleHandler}
    >
      {theme === 'light' ? <BsSun size={20} /> : <BsMoon size={20} />}
    </div>
  )
}

export default ThemeToggle
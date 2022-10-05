/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { BsSun, BsMoon } from 'react-icons/bs'
import { ActionIcon } from '@mantine/core'

import { useThemeToggle } from 'src/hooks/useTheme'

const ThemeToggle = () => {
  const { theme, themeToggleHandler } = useThemeToggle()

  return (
    <div
      className="flex items-center justify-center w-8 h-7"
      onClick={themeToggleHandler}
    >
      <ActionIcon variant="subtle" className='hover:text-light-blue dark:hover:text-sky-blue-dark hover:bg-off-white dark:hover:bg-off-black/80'>
        {theme === 'light' ? <BsSun size={18} /> : <BsMoon size={18} />}
      </ActionIcon>
    </div>
  )
}

export default ThemeToggle

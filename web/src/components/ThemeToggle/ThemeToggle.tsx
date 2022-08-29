import { BsSun, BsMoon } from 'react-icons/bs'
import useTheme from 'src/hooks/useTheme'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themeToggleHandler = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    const mainHTML = document.querySelector('html');
    mainHTML.classList.toggle("dark");
  }

  return (
    <div className='flex items-center justify-center w-8 h-7' onClick={themeToggleHandler}>
      {theme === 'light' ? <BsSun size={20}/> : <BsMoon size={20}/>}
    </div>
  )
}

export default ThemeToggle

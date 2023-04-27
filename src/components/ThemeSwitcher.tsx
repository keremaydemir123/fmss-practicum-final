import { useState, useEffect } from 'react';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';

function ThemeSwitcher() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // set the theme on initial load
  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
    // set the theme in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <SunIcon
        className={`${
          theme === 'light' ? 'block' : 'hidden'
        } swap-on w-12 h-12 cursor-pointer text-yellow-300 hover:animate-spin`}
        onClick={toggleTheme}
      />
      <MoonIcon
        className={`${
          theme === 'light' ? 'hidden' : 'block'
        } swap-off h-12 cursor-pointer text-gray-300 hover:animate-pulse`}
        onClick={toggleTheme}
      />
    </>
  );
}

export default ThemeSwitcher;

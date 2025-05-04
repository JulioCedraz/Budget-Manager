import React, { useState, useEffect, createContext, useContext } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';

const ThemeContext = createContext();

export const themeColors = {
  light: {
    background: 'bg-gray-200 text-gray-900',
    container: 'bg-gray-100',
    tableHeader: 'bg-gray-300 border-gray-300',
    tableBorder: 'border-gray-300',
    input: 'border-gray-300 bg-white',
    button: {
      edit: 'bg-slate-500 hover:bg-slate-400',
      delete: 'bg-red-600 hover:bg-red-500',
      add: 'bg-blue-600 hover:bg-blue-500'
    }
  },
  dark: {
    background: 'bg-gray-900 text-gray-100',
    container: 'bg-gray-800',
    tableHeader: 'bg-gray-900 border-gray-600',
    tableBorder: 'border-gray-600',
    input: 'bg-gray-600 border-gray-500 text-gray-100',
    button: {
      edit: 'bg-slate-600 hover:bg-slate-500',
      delete: 'bg-red-800 hover:bg-red-700',
      add: 'bg-blue-700 hover:bg-blue-600'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // fallback
  };

  const [theme, setTheme] = useState(getSystemTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setTheme(mediaQuery.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme} 
      className="absolute h-10 w-10 top-0 right-0 pb-2 pl-3 rounded-bl-full sm:top-4 sm:right-4 sm:p-2 sm:rounded-full text-gray-100 bg-gray-700 hover:bg-gray-600"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
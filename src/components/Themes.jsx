import React, { useState, createContext, useContext } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';

const ThemeContext = createContext();

export const themeColors = {
  light: {
    background: 'bg-white text-gray-900',
    container: 'bg-gray-100',
    tableHeader: 'bg-gray-300',
    tableBorder: 'border-gray-300',
    input: 'border-gray-300 bg-white',
    button: {
      edit: 'bg-slate-600 hover:bg-slate-500',
      delete: 'bg-red-600 hover:bg-red-500',
      add: 'bg-blue-600 hover:bg-blue-500'
    }
  },
  dark: {
    background: 'bg-gray-900 text-gray-100',
    container: 'bg-gray-800',
    tableHeader: 'bg-gray-700',
    tableBorder: 'border-gray-600',
    input: 'border-gray-600 bg-gray-700 text-gray-100',
    button: {
      edit: 'bg-slate-800 hover:bg-slate-700',
      delete: 'bg-red-800 hover:bg-red-700',
      add: 'bg-blue-800 hover:bg-blue-700'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeToggle = () => {
  const { theme, toggleTheme, themeColors } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme} 
      className="absolute h-10 w-10 top-0 right-0 pb-2 pl-3 rounded-bl-full sm:top-3 sm:right-1 sm:p-2 sm:rounded-full bg-gray-200 text-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
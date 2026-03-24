import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(false);
    localStorage.setItem('darkMode', 'false');
    document.documentElement.classList.remove('dark');
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(false);
    localStorage.setItem('darkMode', 'false');
    document.documentElement.classList.remove('dark');
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};


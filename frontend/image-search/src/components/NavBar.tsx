import React, { useState, useEffect } from 'react';


const NavBar = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }, [isDarkMode]);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    return (
      <nav className={`bg-${isDarkMode ? 'gray-700' : 'gray-200'} p-4 flex justify-between items-center`}>
        <h1 className={`text-${isDarkMode ? 'white' : 'gray-700'} text-lg font-bold`}>Image Search Engine</h1>
        <button
          onClick={toggleDarkMode}
          className={`bg-${isDarkMode ? 'gray-200 dark:bg-gray-700' : 'gray-800'} ${isDarkMode ? 'text-gray-800 dark:text-gray-200' : 'text-white'} px-4 py-2 rounded`}
        >
          Toggle Dark Mode
        </button>
      </nav>
    );
    
}

export default NavBar

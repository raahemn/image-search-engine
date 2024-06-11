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
      <nav className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-900">

        <h1 className="dark:text-white text=gray-700 text-lg font-bold">Image Search Engine</h1>
        <button
          onClick={toggleDarkMode}
          className={`dark:bg-gray-200 bg-gray-700 dark:text-gray-900 text-white px-4 py-2 rounded`}
        >
          Toggle Dark Mode
        </button>
      </nav>
    );
    
}

export default NavBar

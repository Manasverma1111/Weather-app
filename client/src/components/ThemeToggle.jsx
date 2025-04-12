import React from 'react';
import './ThemeToggle.css';

function ThemeToggle({ darkMode, toggleDarkMode }) {
  return (
    <div className="theme-toggle">
      <button 
        onClick={toggleDarkMode} 
        className={`toggle-button ${darkMode ? 'dark' : 'light'}`}
      >
        {darkMode ? '☀️' : '🌑'}
      </button>
      <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </div>
  );
}

export default ThemeToggle;
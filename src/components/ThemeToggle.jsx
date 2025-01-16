import React, { useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
    >
      <span>{isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</span>
    </button>
  );
};

export default ThemeToggle;

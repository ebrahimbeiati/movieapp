
import React from "react";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full md:w-2/3">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies..."
        className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
    </div>
  );
};

export default SearchBox;

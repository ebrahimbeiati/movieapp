import React from "react";

const MovieCard = ({ movie, onClick, toggleFavorite, isFavorite }) => {
  return (
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-200"
      onClick={onClick}
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400?text=No+Image"}
        alt={movie.Title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 bg-gray-800">
        <h3 className="text-lg font-bold text-white">{movie.Title}</h3>
        <p className="text-sm text-gray-300">{movie.Year}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`mt-2 px-4 py-2 rounded-full text-white ${
            isFavorite ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isFavorite ? "❤️ Remove" : "♡ Add"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

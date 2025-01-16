import React from "react";
import MovieCard from "../movieCard/MovieCard";

const MovieList = ({ movies, onMovieClick, toggleFavorite, favorites }) => {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={() => onMovieClick(movie)}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
        />
      ))}
    </div>
  );
};

export default MovieList;

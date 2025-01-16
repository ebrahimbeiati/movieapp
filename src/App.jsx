import React, { useState, useEffect } from "react";
import SearchBox from "./components/search/SearchBox";
import MovieList from "./components/movieList/MovieList";
import MovieDetail from "./components/movieDetails/MovieDetail";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("search");

  const getMovies = async (searchTerm) => {
    const url = `http://www.omdbapi.com/?s=${searchTerm || "popular"}&apikey=bb000501`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Search) setMovies(data.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getMovies(searchTerm);
  }, [searchTerm]);

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <header className="sticky top-0 z-50 bg-gray-900 shadow-md">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold text-indigo-500">🎥 Movie Explorer</h1>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <nav className="flex justify-center space-x-6 py-2 bg-gray-800">
          <button
            className={`px-4 py-2 font-medium rounded ${
              activeTab === "search" ? "bg-indigo-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("search")}
          >
            Search Results
          </button>
          <button
            className={`px-4 py-2 font-medium rounded ${
              activeTab === "favorites" ? "bg-indigo-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites <span className="text-red-400">({favorites.length})</span>
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        {!selectedMovie ? (
          activeTab === "search" ? (
            <MovieList
              movies={movies}
              onMovieClick={setSelectedMovie}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          ) : (
            <MovieList
              movies={favorites}
              onMovieClick={setSelectedMovie}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          )
        ) : (
          <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </main>
    </div>
  );
};

export default App;

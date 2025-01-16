

import  { useState, useEffect } from "react";
import MovieCard from "./components/movieCard/MovieCard";
import MovieDetail from "./components/movieDetails/MovieDetail";
import SearchBox from "./components/search/SearchBox";
import ThemeToggle from "./components/ThemeToggle";

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
    <div className="min-h-screen bg-gray-800 text-white">
      <header className="sticky top-0 bg-gray-900 p-5 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-500">Movie Explorer</h1>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ThemeToggle />
        </div>
        <div className="flex justify-center space-x-6 py-3 bg-gray-800">
          <button
            className={`px-6 py-3 ${activeTab === "search" ? "bg-indigo-500" : "bg-gray-700 hover:bg-gray-600"}`}
            onClick={() => setActiveTab("search")}
          >
            Search Results
          </button>
          <button
            className={`px-6 py-3 ${activeTab === "favorites" ? "bg-indigo-500" : "bg-gray-700 hover:bg-gray-600"}`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites ({favorites.length})
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {!selectedMovie ? (
          activeTab === "search" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                  toggleFavorite={toggleFavorite}
                  isFavorite={true}
                />
              ))}
            </div>
          )
        ) : (
          <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </main>
    </div>
  );
};

export default App;

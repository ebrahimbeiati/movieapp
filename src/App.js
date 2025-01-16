// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import MovieList from "./components/movieList/MovieList";
// import MovieListHeading from "./components/movieListHeading/MovieListHeading";
// import SearchBox from "./components/search/SearchBox";
// import AddFavourite from "./components/addFavourite/AddFavourite";
// import RemoveFavourite from "./components/removeFavourite/RemoveFavourites";
// import MovieDetail from "./components/movieDetails/MovieDetail";



// const App = () => {
//   const [movies, setMovies] = useState([]);
//   const [favourites, setFavourites] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   const getPopularMovies = async () => {
//     const url = `http://www.omdbapi.com/?s=popular&apikey=bb000501`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.Search) {
//         setMovies(data.Search);
//       }
//     } catch (error) {
//       console.error("Error fetching popular movies:", error);
//     }
//   };

//   const getMovies = async (searchTerm) => {
//     const url = searchTerm
//       ? `http://www.omdbapi.com/?s=${searchTerm}&apikey=bb000501`
//       : `http://www.omdbapi.com/?s=&apikey=bb000501`; // Fetch all movies when searchTerm is empty

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.Search) {
//         setMovies(data.Search);
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   useEffect(() => {
//     getPopularMovies();
//     getFavouritesFromLocalStorage();
//   }, []);

//   useEffect(() => {
//     getMovies(searchTerm);
//   }, [searchTerm]);

//   const getFavouritesFromLocalStorage = () => {
//     const movieFavourites = JSON.parse(
//       localStorage.getItem("react-movie-app-favourites")
//     );

//     if (movieFavourites) {
//       setFavourites(movieFavourites);
//     }
//   };

//   const saveToLocalStorage = (items) => {
//     localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
//   };

//   const addFavouriteMovie = (movie) => {
//     const newFavouriteList = [...favourites, movie];
//     setFavourites(newFavouriteList);
//     saveToLocalStorage(newFavouriteList);
//   };

//   const removeFavouriteMovie = (movie) => {
//     const newFavouriteList = favourites.filter(
//       (favourite) => favourite.imdbID !== movie.imdbID
//     );

//     setFavourites(newFavouriteList);
//     saveToLocalStorage(newFavouriteList);
//   };

//   const handleMovieClick = (movie) => {
//     setSelectedMovie(movie);
//   };

//     return (
//       <div className="container-fluid movie-app">
//         <div className="row d-flex align-items-center mt-4 mb-4">
//           <MovieListHeading heading="Movies" />
//           <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         </div>
//         <div className="row">
//           <MovieList
//             movies={movies}
//             handleFavouritesClick={addFavouriteMovie}
//             handleMovieClick={handleMovieClick}
//             favouriteComponent={AddFavourite}
//           />
//         </div>
//         <div className="row d-flex align-items-center mt-4 mb-4">
//           <MovieListHeading heading="Favourites"  />
//         </div>
//         <div className="row">
//           <MovieList
//             movies={favourites}
//             handleFavouritesClick={removeFavouriteMovie}
//             handleMovieClick={handleMovieClick}
//             favouriteComponent={RemoveFavourite}
//           />
//         </div>
//         {selectedMovie && (
//           <MovieDetail
//             movie={selectedMovie}
//             handleMovieClose={() => setSelectedMovie(null)}
//           />
//         )}
//       </div>
//     );
// };
//   export default App;





// import React, { useState, useEffect } from "react";
// import MovieCard from "./components/movieCard/MovieCard";
// import MovieDetail from "./components/movieDetails/MovieDetail";
// import SearchBox from "./components/search/SearchBox";
// import ThemeToggle from "./components/ThemeToggle";

// const App = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [favorites, setFavorites] = useState([]);
//   const [activeTab, setActiveTab] = useState("search");

//   const getMovies = async (searchTerm) => {
//     const url = `http://www.omdbapi.com/?s=${searchTerm || "popular"}&apikey=bb000501`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.Search) setMovies(data.Search);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   useEffect(() => {
//     getMovies(searchTerm);
//   }, [searchTerm]);

//   const toggleFavorite = (movie) => {
//     const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
//     if (isFavorite) {
//       setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
//     } else {
//       setFavorites([...favorites, movie]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-800 text-white">
//       <header className="sticky top-0 bg-gray-900 p-5 shadow-lg">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-indigo-500">Movie Explorer</h1>
//           <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//           <ThemeToggle />
//         </div>
//         <div className="flex justify-center space-x-6 py-3 bg-gray-800">
//           <button
//             className={`px-6 py-3 ${activeTab === "search" ? "bg-indigo-500" : "bg-gray-700 hover:bg-gray-600"}`}
//             onClick={() => setActiveTab("search")}
//           >
//             Search Results
//           </button>
//           <button
//             className={`px-6 py-3 ${activeTab === "favorites" ? "bg-indigo-500" : "bg-gray-700 hover:bg-gray-600"}`}
//             onClick={() => setActiveTab("favorites")}
//           >
//             Favorites ({favorites.length})
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto px-6 py-8">
//         {!selectedMovie ? (
//           activeTab === "search" ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {movies.map((movie) => (
//                 <MovieCard
//                   key={movie.imdbID}
//                   movie={movie}
//                   onClick={() => setSelectedMovie(movie)}
//                   toggleFavorite={toggleFavorite}
//                   isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {favorites.map((movie) => (
//                 <MovieCard
//                   key={movie.imdbID}
//                   movie={movie}
//                   onClick={() => setSelectedMovie(movie)}
//                   toggleFavorite={toggleFavorite}
//                   isFavorite={true}
//                 />
//               ))}
//             </div>
//           )
//         ) : (
//           <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
//         )}
//       </main>
//     </div>
//   );
// };

// export default App;

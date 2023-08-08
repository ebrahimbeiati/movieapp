// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import MovieList from "./components/MovieList";
// import MovieListHeading from "./components/MovieListHeading";
// import SearchBox from "./components/SearchBox";
// import AddFavourites from "./components/AddFavourite";
// import RemoveFavourites from "./components/RemoveFavourites";

// const App = () => {
// const [movies, setMovies] = useState([]);
//   const [favourites, setFavourites] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const getMovieRequest = async (searchValue) => {
//     const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=aeb2b829`;

//     const response = await fetch(url);
//     const responseJson = await response.json();

//     if (responseJson.Search) {
//       setMovies(responseJson.Search);
//     }
//   };

//   useEffect(() => {
//     getMovieRequest(searchValue);
//   }, [searchValue]);

//   useEffect(() => {
//     const movieFavourites = JSON.parse(
//       localStorage.getItem("react-movie-app-favourites")
//     );

//     if (movieFavourites) {
//       setFavourites(movieFavourites);
//     }
//   }, []);

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

//   return (
//     <div className="container-fluid movie-app">
//       <div className="row d-flex align-items-center mt-4 mb-4">
//         <MovieListHeading heading="Movies" />
//         <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
//       </div>
//       <div className="row">
//         <MovieList
//           movies={movies}
//           handleFavouritesClick={addFavouriteMovie}
//           favouriteComponent={AddFavourites}
//         />
//       </div>
//       <div className="row d-flex align-items-center mt-4 mb-4">
//         <MovieListHeading heading="Favourites" />
//       </div>
//       <div className="row">
//         <MovieList
//           movies={favourites}
//           handleFavouritesClick={removeFavouriteMovie}
//           favouriteComponent={RemoveFavourites}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourite from "./components/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getPopularMovies = async () => {
    const url = `http://www.omdbapi.com/?s=popular&apikey=bb000501`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const getMovies = async (searchTerm) => {
    const url = searchTerm
      ? `http://www.omdbapi.com/?s=${searchTerm}&apikey=bb000501`
      : `http://www.omdbapi.com/?s=&apikey=bb000501`; // Fetch all movies when searchTerm is empty

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
    getFavouritesFromLocalStorage();
  }, []);

  useEffect(() => {
    getMovies(searchTerm);
  }, [searchTerm]);

  const getFavouritesFromLocalStorage = () => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          handleMovieClick={handleMovieClick}
          favouriteComponent={AddFavourite}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          handleMovieClick={handleMovieClick}
          favouriteComponent={RemoveFavourite}
        />
      </div>
    </div>
  );
};

export default App;

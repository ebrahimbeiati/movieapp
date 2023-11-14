// import React from "react";

// const MovieList = (props) => {
//   const FavouriteComponent = props.favouriteComponent;

//   return (
//     <>
//       {props.movies.map((movie, index) => (
//         <div
//           className="image-container d-flex justify-content-start m-2"
//           key={movie.imdbID}
//         >
//           <img src={movie.Poster} alt="movie" />
        
        
          

//           <div
//             onClick={() => props.handleFavouritesClick(movie)}
//             className="overlay d-flex align-items-center justify-content-center"
//           >
//             <FavouriteComponent />
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default MovieList;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieList = (props) => {
  const [detailedMovies, setDetailedMovies] = useState([]);

  useEffect(() => {
    const fetchDetailedMovies = async () => {
      const detailedMoviesData = await Promise.all(
        props.movies.map(async (movie) => {
          // Fetch detailed movie data using IMDb ID (use 'i' instead of 's' for a single movie)
          const response = await axios.get(
            `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=bb000501`
          );
          return response.data; // Assuming the API response contains details like Title, Plot, Actors, etc.
        })
      );
      setDetailedMovies(detailedMoviesData);
    };

    fetchDetailedMovies();
  }, [props.movies]);

  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      {detailedMovies.map((movie, index) => (
       
          <div
            className="image-container gap-2 d-flex  overflow-wrap: break-word justify-content-start m-2"
            key={movie.imdbID}
          >
            <img src={movie.Poster} alt="movie" />
            <div>
              <h3>{movie.Title}</h3>
              <p>{movie.Plot}</p>
            <p>Actors: {movie.Actors}</p>
            <p>Director: {movie.Director}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Released: {movie.Released}</p>
            <p>Runtime: {movie.Runtime}</p>
            
              {/* Other movie details can be accessed similarly */}
            </div>

            <div
              onClick={() => props.handleFavouritesClick(movie)}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <FavouriteComponent />
            </div>
          </div>
        
      ))}
    </>
  );
};

export default MovieList;

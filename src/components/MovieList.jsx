
import React from 'react';

const MovieList = (props) => {
  const { movie } = props; // Destructuring the 'movie' prop

  return (
    <div className="image-container d-flex justify-content-start m-3">
      <img src={movie.Poster} alt="movie" />
    </div>
  );
};

export default MovieList;

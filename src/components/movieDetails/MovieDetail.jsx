import React, { useEffect, useState } from "react";

const MovieDetail = ({ movie, onClose }) => {
  const [movieDetail, setMovieDetail] = useState(null);

  const fetchMovieDetail = async (id) => {
    const url = `http://www.omdbapi.com/?i=${id}&apikey=bb000501`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovieDetail(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetail(movie.imdbID);
  }, [movie]);

  if (!movieDetail) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
        <button onClick={onClose} className="text-blue-500 font-semibold">Back to list</button>
        <div className="flex gap-6 mt-4">
          <img src={movieDetail.Poster} alt={movieDetail.Title} className="w-1/3 rounded-lg" />
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold">{movieDetail.Title}</h2>
            <p className="text-lg mt-2">{movieDetail.Plot}</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li><strong>Actors:</strong> {movieDetail.Actors}</li>
              <li><strong>Director:</strong> {movieDetail.Director}</li>
              <li><strong>Genre:</strong> {movieDetail.Genre}</li>
              <li><strong>Released:</strong> {movieDetail.Released}</li>
              <li><strong>Runtime:</strong> {movieDetail.Runtime}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

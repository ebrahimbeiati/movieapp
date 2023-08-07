import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import './App.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState('');

  const getMovies = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=bb000501`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setMovies(responseJson.Search);
  };

  useEffect(()=>{
    getMovies(searchValue);
  },[searchValue]);

  const AddFavouriteMovie =(movie)=>{
    const newMovieList = [...favourites,movie];
    setFavourites(newFavouriteList);
  }
     




  return (
    <div className="container-fluid movie-app">
    <div className='row d-flex align=items-center mt-4 mb-4'>
    <MovieListHeading heading='Movies'/>
    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>

    </div>
    <div className="row">
      <div className="col-12">
        <div className="card-deck">
          {movies?.map((movie) => (
            <MovieList movie={movie} key={movie.imdbID} />
            handleFavouritesClick={ AddFavouriteMovie }
            favouriteComponent = {AddFavourite}
            
          ))}
        </div>
      </div>
      

    </div>

    </div>
  
  );
}

export default App;

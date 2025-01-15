import React from "react";
import "./MovieListHeading.css";

const MovieListHeading = (props) => {
  return (
    <div className="col">
      <h1>{props.heading}</h1>
      <hr />
      
    </div>
  );
};

export default MovieListHeading;

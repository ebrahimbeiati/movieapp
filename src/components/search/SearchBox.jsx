import React from "react";
import "./Search.css";
const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        value={props.searchTerm}
        onChange={(event) => props.setSearchTerm(event.target.value)}
        placeholder="Type to search..."
      ></input>
    </div>
  );
};


export default SearchBox;

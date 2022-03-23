import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedByName, searchbarName } from "../../Action/index.js";
import "./searchBar.css";

function SearchBar(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const {setCurrentPage} = props;

  function handleInput(event) {
    event.preventDefault();
    setName(event.target.value);
    dispatch(searchbarName(event.target.value));
    setCurrentPage(1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name) {
      dispatch(getBreedByName(name));
      setName("");
      setCurrentPage(1);
    }
  }

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          id="form"
          value={name}
          type="text"
          placeholder="Nombre"
          onChange={(event) => handleInput(event)}
          className="inputSearchBar"
        />
        <div className="btn-search">
          <button className="btn-barr" type="submit">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;

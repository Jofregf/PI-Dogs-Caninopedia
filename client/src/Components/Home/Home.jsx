import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBreeds, getTemperaments, spinner } from "../../Action/index";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import FilterDbOrApi from "../Filters/FilterDbOrApi";
import OrderByWeight from "../Filters/OrderByWeight";
import FilterByTemperament from "../Filters/FilterByTemperament";
import AlphabeticFilter from "../Filters/AlphabeticFilter";
import Paged from "../Page/Paged";
import "./home.css";
import Spinner from "../Spinner/Spinner";

function Home() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.breeds);
  const loading = useSelector((state) => state.loading);
  const control = useSelector((state) => state.control)
  const [currentPage, setCurrentPage] = useState(1);
  const [breedsPerPage] = useState(8);
  const lastIndexBreed = currentPage * breedsPerPage;
  const firstIndexBreed = lastIndexBreed - breedsPerPage;
  const currentBreeds = breeds.slice(firstIndexBreed, lastIndexBreed);

  const Page = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleClick(event) {
    dispatch(getBreeds(event));
  }

  useEffect(() => {
    dispatch(spinner())
    dispatch(getBreeds());
    dispatch(getTemperaments());
  },[dispatch]);
 
  return (
    <div>
      <div className="upperContainer">
        <div className="btn-homes">
          <button className="btn-indiv" onClick={(event) => handleClick(event)}>
            Actualizar
          </button>
        </div>
        <div>
          <span className="home-search">
            <SearchBar setCurrentPage={setCurrentPage}/>
          </span>
        </div>
        <div>
          <span className="HomeCreateDiv">
            <div className="btn-homes">
              <Link to="/create">
                <button className="btn-indiv">Crear</button>
              </Link>
            </div>
          </span>
        </div>
      </div>
      <div className="FiltersHome">
        <FilterDbOrApi setCurrentPage={setCurrentPage}/>
        <AlphabeticFilter />
        <OrderByWeight />
        <FilterByTemperament setCurrentPage = {setCurrentPage}/>
      </div>
      <div className="home-details">
        {loading === false ? (
          currentBreeds.map((breed) => (
            
            <Card
              key={breed.id}
              name={breed.name}
              image={breed.image}
              temperament={
                breed.temperament[0] !== "" ? (
                  breed.temperament.map((temp, i) => <div key={i}>{temp}</div>)
                ) : (
                  <p className = "nodatos">Sin datos</p>
                )
              }
              id={breed.id}
              weight_min={
                breed.weight_min ? breed.weight_min : <p className = "nodatos">Sin datos</p>
              }
              weight_max={
                breed.weight_max ? breed.weight_max : <p className = "nodatos">Sin datos</p>
              }
            />
                        
          ))
        ) : (
          <Spinner />
        )}
        {control === true && <h1 className="mensaje">No hay razas almacenadas en la base de datos</h1>}
      
      </div>
      <Paged
        breedsPerPage={breedsPerPage}
        breedsLength={breeds.length}
        Page={Page}
      />
    </div>
  );
}

export default Home;

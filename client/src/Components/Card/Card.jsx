import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

function Card({ name, image, temperament, weight_min, weight_max, id, owner }) {
  // console.log(id, 'id card')
  return (
    <div className="card-container">
      <Link className="card-link" to={`/dogs/${id}`}>
        <h3 className="card-title">{name}</h3>
        <img
          className="card-image"
          src={`${image}`}
          alt={name}
          height="300px"
          weight="300px"
        />
        <div>
          <h5 className="card-subtitles">Temperamentos</h5>
          <div className="card-characteristics">{temperament}</div>
        </div>
        <h5 className="card-subtitles">Pesos (kg)</h5>
        <div className="weight-container">
          <div>
            <p className="weight-title">Peso mínimo</p>
            <span className="card-weight">{weight_min}</span>
          </div>
          <div>
            <p className="weight-title">Peso máximo</p>
            <span className="card-weight">{weight_max}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;

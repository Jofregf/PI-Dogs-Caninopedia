import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getBreedsDetails } from "../../Action/index";
import "./details.css";
import Spinner from "../Spinner/Spinner";

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [details] = useState(id);

  useEffect(() => {
    dispatch(getBreedsDetails(details));
  }, [dispatch, details]);

  const myDetails = useSelector((state) => state.breedDetails);
 
  return (
    <div>
      <div className="details-container">
        {Array.isArray(myDetails) ? (
          myDetails.map((detail, i) => (
            <div key={i}>
              <h1 className="details-name">{detail.name}</h1>
              <div className="img-container">
                <img
                  className="details-img"
                  src={detail.image}
                  alt={detail.name}
                />
              </div>
              <h5 className="title-details">Peso (kg)</h5>
              <div className="characteristics-container">
                <div>
                  <p className="subtitle-details">Mínimo</p>
                  <p className="valors-details">
                    {detail.weight_min ? detail.weight_min : <p>Sin Datos</p>}{" "}
                  </p>
                </div>
                <div>
                  <p className="subtitle-details">Máximo</p>
                  <p className="valors-details">
                    {detail.weight_max ? detail.weight_max : <p>Sin Datos</p>}{" "}
                  </p>
                </div>
              </div>
              <h5 className="title-details">Altura (cm)</h5>
              <div className="characteristics-container">
                <div>
                  <p className="subtitle-details">Mínimo</p>
                  <p className="valors-details">
                    {detail.height_min ? detail.height_min : <p>Sin Datos</p>}{" "}
                  </p>
                </div>
                <div>
                  <p className="subtitle-details">Máximo</p>
                  <p className="valors-details">
                    {detail.height_max ? detail.height_max : <p>Sin Datos</p>}{" "}
                  </p>
                </div>
              </div>
              <h5 className="title-details">Promedio de Vida (años)</h5>
              <div className="characteristics-container">
                <div>
                  <p className="subtitle-details">Mínimo</p>
                  <p className="valors-details">
                    {detail.life_span_min ? (
                      detail.life_span_min
                    ) : (
                      <p>Sin Datos</p>
                    )}{" "}
                  </p>
                </div>
                <div>
                  <p className="subtitle-details">Máximo</p>
                  <p className="valors-details">
                    {detail.life_span_max ? (
                      detail.life_span_max
                    ) : (
                      <p>Sin Datos</p>
                    )}{" "}
                  </p>
                </div>
              </div>
              <h5 className="title-details">Temperamentos</h5>
              <div className="temperaments-container">
                {detail.temperament[0] !== "" ? (
                  detail.temperament.map((temp, i) => (
                    <div key={i}>
                      <p className="valors-temperament">{temp}</p>
                    </div>
                  ))
                ) : (
                  <p>Sin datos</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}

        <div className="btn-details">
          <Link to="/home">
            <button className="btn-inner">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Details;

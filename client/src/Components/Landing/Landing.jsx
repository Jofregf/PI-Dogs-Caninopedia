import React from "react";
import { Link } from "react-router-dom";
import './landing.css'

function Landing() {
  return (
    <div className="landing-container">
      <div>
        <h1 className='texto-landing'>Bienvenidos a Caninopedia</h1>
      </div>
      <div className='btn-container'>
        <Link to="/home">
          <button className="btn-landing">Ingresar</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;

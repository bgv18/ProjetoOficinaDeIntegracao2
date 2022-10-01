import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="div-principal">
      <div className="header">
        <Link to="/" className="logo">
          OI2
        </Link>
        <Link to="/login">
          <button className="main-acessar">Acessar</button>
        </Link>
      </div>
      <div className="principal-content">
        <div>
          <h3>Projeto de Oficina de Integracao 2</h3>
        </div>
        <div>
          Bruno Guerra Vieira e Igor Bregagnoli
        </div>
      </div>
    </div>
  );
}

export default Home;

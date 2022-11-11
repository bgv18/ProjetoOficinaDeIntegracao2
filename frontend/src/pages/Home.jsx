import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="div-principal">
      <div className="header">
        <h1 className="logo">
          OI2
        </h1>
        <button className="main-acessar" onClick={() => navigate("/login")}>
          Acessar
        </button>
      </div>
      <div className="principal-content">
        <div>
          <h3>Projeto de Oficina de Integracao 2</h3>
        </div>
        <div>Bruno Guerra Vieira e Igor Bregagnoli</div>
      </div>
    </div>
  );
}

export default Home;

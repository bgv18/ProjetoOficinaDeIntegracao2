import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function NavbarDashboard(props) {
  return (
    <header>
      <Link to="/" className="logo-nav">
        OI2
      </Link>
      <div className="div__nav">
        <nav className="header__nav">
          <ul className="nav__links">
            <li>
              <Link
                to="/home"
                style={
                  props.paginaSelecionada === "home"
                    ? { color: "#2c7aed" }
                    : null
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="Clientes"
                style={
                  props.paginaSelecionada === "clientes"
                    ? { color: "#2c7aed" }
                    : null
                }
              >
                Clientes
              </Link>
            </li>
            <li>
              <Link
                to="terras"
                style={
                  props.paginaSelecionada === "terras"
                    ? { color: "#2c7aed" }
                    : null
                }
              >
                Terras
              </Link>
            </li>
          </ul>
        </nav>
        <a>
            <button>
              Logout
            </button>
        </a>
      </div>
    </header>
  );
}

export default NavbarDashboard;

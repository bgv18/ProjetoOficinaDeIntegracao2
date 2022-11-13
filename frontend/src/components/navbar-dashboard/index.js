import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function NavbarDashboard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);

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
                to="/cadastroCliente"
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
          {props.sair ? (
            <button
              className="btn__criar"
              id="botaoSair"
              onClick={props.sair}
            >
              Logout
            </button>
          ) : null}
        </a>
      </div>
    </header>
  );
}

export default NavbarDashboard;

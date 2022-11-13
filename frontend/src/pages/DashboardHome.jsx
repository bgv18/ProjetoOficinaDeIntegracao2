import React from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/navbar-dashboard";
import "../styles/dashboard-home.css";

function DashboardHome() {
  const dispatch = useDispatch();
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);


  function sair() {
    dispatch({ type: "LOGOUT" });
  }

  const navigate = useNavigate();

  const usuarioNome = useSelector((state) => state.usuarioNome);
  return (
    <>
      {useSelector((state) => state.usuarioLogado) === 0 ? navigate("/") : null}
      <div>
        <Toaster />
      </div>
      <NavbarDashboard paginaSelecionada="home" sair={sair} />
      <div className="home-content">
        {usuarioNome && <h2>Olá, seja bem-vindo {usuarioNome}</h2>}
      </div>
    </>
  );
}

export default DashboardHome;

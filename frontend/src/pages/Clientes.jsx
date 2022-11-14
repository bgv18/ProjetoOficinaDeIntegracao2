import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import CadastrarClientes from "../components/CadastrarClientes";
import NavBar from "../components/navbar-dashboard";
import Cliente from "../components/Cliente";
import "../styles/clientes.css";

const baseURL = "http://localhost:3001/clientes";

function Clientes() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [costumer, setCostumer] = useState([]);
  const lstClientes = [];

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${usuarioToken}`,
    };

    axios
      .get(baseURL, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data.clientes);
        setCostumer(res.data.clientes);
      })
      .catch((err) => {
        toast.error("Erro ao carregar clientes");
      });
  }, [show]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <NavBar
        paginaSelecionada="clientes"
        btnTexto="Clientes"
        criar={handleShow}
      />
      <div className="tarefas-content">
        {costumer?.map((item) => (
          <Cliente item={item} />
        ))}
      </div>
      {show && <CadastrarClientes open={handleShow} close={handleClose} />}
    </>
  );
}

export default Clientes;
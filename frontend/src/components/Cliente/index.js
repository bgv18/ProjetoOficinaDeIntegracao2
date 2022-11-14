import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ModalCliente from "../CadastrarClientes";
import "./cliente.css";

var id;

const baseURL = "http://localhost:3001/clientes";

function Cliente(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);

  id = props.item.id;

  var rand = Math.floor(Math.random() * 360);
  function excluir(id) {
    if (id) {
      const headers = {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${usuarioToken}`,
      };

      axios
        .delete(`${baseURL}/${id}`, {
          headers: headers,
        })
        .then((res) => {
          toast.success("Cliente deletado com sucesso");
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  }
  

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="card">
        <div className="card-body">
          <div className="title-btn">
            <button
              className="btn btnDetalhes"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
            >
              <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="dropdown-item" onClick={handleShow}>
                Alterar
              </li>
              <li
                className="dropdown-item"
                onClick={() => {
                  excluir(props.item.id);
                }}
              >
                Excluir
              </li>
            </ul>
          </div>

          <div
            className="div-marcacao"
            style={{ backgroundColor: "hsl(" + rand + ", 84%, 55%)" }}
          ></div>
          <h5
            className="card-title"
            style={{ fontWeight: "700", marginTop: -4 }}
          >
            {props.item.nome}
          </h5>
          <p className="card-text">{props.item.CpfOuCnpj}</p>
          <p className="card-text">{props.item.cidade}</p>
          <p className="card-text">{props.item.estado}</p>
          <p className="card-text">{props.item.pais}</p>
        </div>
      </div>
      {show == true && (
        <ModalCliente item={props.item} close={handleClose} show={handleShow} />
      )}
    </>
  );
}

export default Cliente;
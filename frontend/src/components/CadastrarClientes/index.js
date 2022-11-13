import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const baseURL = "http://localhost:3001/clientes";

function ModalCliente(props) {
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [show, setShow] = useState(true);

  const [cpfOuCnpj, setCpfOuCnpj] = useState();
  const [nome, setNome] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();
  const [pais, setPais] = useState();


  const dadosCliente = {
    cpfOuCnpj: cpfOuCnpj,
    nome: nome,
    cidade: cidade,
    estado: estado,
    pais: pais,
  };

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${usuarioToken}`,
  };

  function cadastrarCliente() {
    axios
      .post(baseURL, dadosCliente, {
        headers: headers,
      })
      .then((res) => {
        toast.success("Cliente cadastrado com sucesso");
        props.close();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }

  function atualizar(id) {
    if (id) {
      axios
        .put(`${baseURL}/${id}`, dadosCliente, {
          headers: headers,
        })
        .then((res) => {
          toast.success("Cliente alterado com sucesso");
          props.close();
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  }

  useEffect(() => {
    props.item ? setNome(props.item.nome) : setNome("");
    props.item ? setCpfOuCnpj(props.item.CpfOuCnpj) : setCpfOuCnpj("");
    props.item ? setCidade(props.cidade) : setCidade("");
    props.item ? setEstado(props.estado) : setEstado("");
    props.item ? setPais(props.pais) : setPais("");
  }, []);

  return (
    <div className="modal">
      <div>
        <Toaster />
      </div>
      <Modal show={show} onHide={props.close}>
        <Modal.Header closeButton>
          {props.item ? (
            <Modal.Title>Alterar cliente</Modal.Title>
          ) : (
            <Modal.Title>Cadastrar cliente</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
        <div className="div__cadastro">
          <div className="div__titulo">
            <h2>Cadastro de Clientes</h2>
          </div>
          <div className="div__inputs">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              className="form-control input"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <label htmlFor="cpfOuCnpj">CPF/CNPJ</label>
            <input
              type="text"
              name="cpfOuCnpj"
              className="form-control input"
              id="cpfOuCnpj"
              value={cpfOuCnpj}
              onChange={(e) => setCpfOuCnpj(e.target.value)}
              required
            />
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              name="cidade"
              className="form-control input"
              id="cidade"
              value={nome}
              onChange={(e) => setCidade(e.target.value)}
              required
            />
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              name="estado"
              className="form-control input"
              id="estado"
              value={nome}
              onChange={(e) => setEstado(e.target.value)}
              required
            />
            <label htmlFor="pais">País</label>
            <input
              type="text"
              name="pais"
              className="form-control input"
              id="pais"
              value={nome}
              onChange={(e) => setPais(e.target.value)}
              required
            />
          </div>
          (
            <button className="main__acessar" onClick={cadastrarCliente}>
              Cadastrar
            </button>
          )
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={
              props.item
                ? () => {
                    atualizar(props.item._id);
                  }
                : cadastrarCliente
            }
          >
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCliente;
import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "../styles/cadastrar.css";

function CadastrarCliente() {
  const [cpfOuCnpj, setCpfOuCnpj] = useState();
  const [nome, setNome] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();
  const [pais, setPais] = useState();
  const [carregando, setCarregando] = useState(0);
  const baseURL = "http://localhost:3001/clientes";

  const dispatch = useDispatch();
  const history = useHistory();
  function cadastrar() {
    setCarregando(1);

    const dadosCadastro = {
      cpfOuCnpj: cpfOuCnpj,
      nome: nome,
      cidade: cidade,
      estado: estado,
      pais: pais,
    };

    const headers = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=UTF-8",
    };

    axios
      .post(baseURL, dadosCadastro, {
        headers: headers,
      })
      .then((res) => {
        setCarregando(0);
        toast.success("Cadastro realizado com sucesso");
        history.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        setCarregando(0);
      });
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="container__cadastro">
        <div className="div__cadastro">
          <div className="div__titulo">
            <h2>Cadastre-se</h2>
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
              value={nome}
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
          {carregando ? (
            <Spinner variant="primary" animation="border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          ) : (
            <button className="main__acessar" onClick={cadastrar}>
              Cadastrar
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default CadastrarCliente;
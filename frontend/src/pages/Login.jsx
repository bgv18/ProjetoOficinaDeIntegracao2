import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [carregando, setCarregando] = useState(0);
  const baseURL = "http://localhost:3001/auth/login";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function auth() {
    setCarregando(1);

    const headers = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=UTF-8",
    };

    const dadosLogin = {
      email: email,
      senha: senha,
    };

    axios
      .post(baseURL, dadosLogin, {
        headers: headers,
      })
      .then((res) => {
        setCarregando(0);
        toast.success("Seja bem vindo!");
        if (res.data.error) {
          alert(res.data.error);
        } else {
          localStorage.setItem("accessToken", res.data);
        }
        dispatch({
          type: "LOGIN",
          usuarioId: res.data.id,
          usuarioNome: res.data.nome,
        });

        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        setCarregando(0);
      });
  }

  return (
    <>
      {useSelector((state) => state.usuarioLogado) > 0
        ? navigate("/dashboard")
        : null}
      <div>
        <Toaster />
      </div>
      <div className="container__principal">
        <div className="div__login">
          <div className="div__titulo">
            <h2>Entrar</h2>
          </div>
          <div className="div__inputs">
            <h5>Email</h5>
            <input
              type="text"
              className="form-control input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5>Senha</h5>
            <input
              type="password"
              className="form-control input"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          {carregando ? (
            <Spinner variant="primary" animation="border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          ) : (
            <div>
              <button className="main__acessar" onClick={auth}>
                Acessar
              </button>
            </div>
          )}
          <span className="criar__conta">
            <span className="criar__conta" style={{ color: "#2C7AED" }}>
              <b>
                <a href="/cadastrar">Crie uma conta</a>
              </b>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;

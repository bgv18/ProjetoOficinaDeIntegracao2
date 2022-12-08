import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import {Box, Typography} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import NavBar from "../components/navbar-dashboard";
import { color } from "@mui/system";

const baseURL = "http://localhost:3001/terras";

function Terras() {
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [places, setPlaces] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  
  const [terra, setTerra] = useState("");
  const [cidade, setCidade] = useState("");
  const [cliente, setCliente] = useState("");
  const [condicao, setCondicao] = useState("");
  
  const dadosTerras = {
    terra: terra,
    cidade: cidade,
    cliente: cliente,
    condicao: condicao,
  };
  
  function cadastrarTerra(dadosTerras){
    if (dadosTerras.terra != ""){
      axios
        .post(baseURL, dadosTerras, {
          headers: headers,
        })
        .then((res) => {
          toast.success("Terra cadastrada com sucesso");
          setModalShow(false);
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  }

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${usuarioToken}`,
  };
  
  useEffect(() => {
    terra ? setTerra(terra) : setTerra("");
    cidade ? setCidade(cidade) : setCidade("");
    cliente ? setCliente(cliente) : setCliente("");
    condicao ? setCondicao(condicao) : setCondicao("");
  }, []);
  
  const columns = useMemo(() => [
    {field:'id', headerName: 'ID', width:100},
    {field:'terra', headerName: 'Terra', width:200},
    {field:'cidade', headerName: 'Cidade', width:500},
    {field:'cliente', headerName: 'Cliente', width:600},
    {field:'condicao', headerName: 'Condição', width:400},
  ], [])

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${usuarioToken}`,
    };

    fetch(baseURL, {headers: headers})
      .then((data) => data.json())
      .then ((data) => setPlaces(data))
  
  }, []);

  return (
    <>
      <Toaster/>
      <NavBar
        paginaSelecionada="terras"
        btnTexto="Terras"
        />
      <Box
      sx={{
        height:400,
        width:'100%'
      }}
      >
        <Typography
        variant="h3"
        component="h3"
        sx={{textAlign:'center', mt:3, mb:3}}
        >
            Terras
        </Typography>
        <DataGrid
          columns={columns}
          rows={places}
          experimentalFeatures={{ newEditingApi: true }}
          getRowId={row => row.id}
        />
      <button 
        onClick={() => setModalShow(true)}
        style={{color: 'black'}}
      >
        Cadastrar Terra
      </button>
      <Modal 
          show={modalShow} 
          onHide={() => setModalShow(false)}
          size = "lg"
          >    
          <Modal.Header>
              <Modal.Title>Cadastrar terra</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="div__cadastro">
            <div className="div__titulo">
              <h2>Cadastro de Terras</h2>
            </div>
            <div className="div__inputs">
              <label htmlFor="terra">Terra</label>
              <input
                type="text"
                name="terra"
                className="form-control input"
                id="terra"
                value={terra}
                onChange={(e) => setTerra(e.target.value)}
                required
              />
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                name="cidade"
                className="form-control input"
                id="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
              />
              <label htmlFor="cliente">Cliente</label>
              <input
                type="text"
                name="cliente"
                className="form-control input"
                id="cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                required
              />
              <label htmlFor="condicao">Condição</label>
              <input
                type="text"
                name="condicao"
                className="form-control input"
                id="condicao"
                value={condicao}
                onChange={(e) => setCondicao(e.target.value)}
                required
              />
            </div>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Fechar
            </Button>
            <Button
              variant="primary"
              onClick={() => cadastrarTerra(dadosTerras)}
            >
              Salvar alterações
            </Button>
          </Modal.Footer>
      </Modal>
      </Box>
    </>
  );
}

export default Terras;

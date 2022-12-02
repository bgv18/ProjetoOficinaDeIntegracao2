import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import {Box, Typography} from "@mui/material"
import {DataGrid} from "@mui/x-data-grid"

const baseURL = "http://localhost:3001/terras";

function Terras() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [place, setPlace] = useState([]);
  const columns = useMemo(() => [
    {field:'terra', headerName: 'Terra', width:60},
    {field:'cidade', headerName: 'Cidade', width:60},
    {field:'cliente', headerName: 'Cliente', width:60},
    {field:'condicao', headerName: 'Condicao', width:60},
  ], [])

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
        console.log(res.data.terras);
        setPlace(res.data.terras);
      })
      .catch((err) => {
        toast.error("Erro ao carregar terras");
      });
  }, [show]);

  return (
    <>
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
        rows={place}
        getRowId={row=>row.terras}
        />
      </Box>
    </>
  );
}

export default Terras;

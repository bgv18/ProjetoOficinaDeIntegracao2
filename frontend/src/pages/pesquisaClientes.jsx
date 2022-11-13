import { Stack, Box } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { SearchBar } from "../../components/SearchBar";
import { useEffect } from "react";
import CadastrarCliente from "../../components/CadastrarCliente"

const baseURL = "http://localhost:3001/clientes";

useEffect(() => {
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${usuarioToken}`,
  };

  async function pesquisarPorId(id) {
    let res = await axios.get(baseURL + "/byId", id, { headers: headers });
    lstClientes = res.data;
  }

  async function pesquisarPorNome(nome) {
    let res = await axios.get(baseURL + "/byNome", nome, { headers: headers });
    lstClientes = res.data;
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [cliente, setCliente] = useState([]);
  let lstClientes = [];
});

let res = axios.get(baseURL, { headers: headers });
lstClientes = res.data;
const rows = (GridRowsProp = [lstClientes]);

const columns = (GridColDef[2] = [
  { field: "nome", headerName: "Nome" },
  { field: "cpf", headerName: "CPF" },
  { field: "cidade", headerName: "Cidade" },
  { field: "estado", headerName: "Estado" },
  { field: "pais", headerName: "Pais" },
]);

export const Clientes = () => {
  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
      <Stack sx={{ margin: 2 }} spacing={2}>
        <SearchBar
          placeholder="Pesquisar por cliente"
          onChange={(e) => console.log(e)}
        />
        <Box width="100%" height="calc(100vh - 100px)">
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      </Stack>
      <div>
        {cliente.map((item) => (
          <CadastrarCliente item={item} />
        ))}
      </div>
      {show && <CadastrarTarefa open={handleShow} close={handleClose} />}
    </Stack>
  );
};

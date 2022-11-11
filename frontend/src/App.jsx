import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardHome from "./pages/DashboardHome";
import Home from "./pages/Home";
import CadastrarUsuario from "./pages/Cadastrar";
import CadastrarCliente from "./pages/CadastrarCliente";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<CadastrarUsuario />} />
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/cadastroCliente" element={<CadastrarCliente />} />
    </Routes>
  );
}

export default App;

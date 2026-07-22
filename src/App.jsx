import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Detalhes from "./pages/Detalhes";
import Favoritos from "./pages/Favoritos";
import Admin from "./pages/Admin";
import AdminEditar from "./pages/AdminEditar";
import MinhaConta from "./pages/MinhaConta";
import Search from "./pages/Search";
import Filmes from "./pages/Filmes";
import Series from "./pages/Series";

function AppRoutes() {
  const location = useLocation();
  const esconderNavbar = location.pathname === "/login";

  return (
    <>
      {!esconderNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/movie/:id" element={<Detalhes />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/editar/:id" element={<AdminEditar />} />
        <Route path="/minha-conta" element={<MinhaConta />} />
        <Route path="/search" element={<Search />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/series" element={<Series />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

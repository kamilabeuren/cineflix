import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectRoute from "./components/ProtectRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RecuperarSenha from "./pages/RecuperarSenha";
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
        <Route path="/search" element={<Search />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/series" element={<Series />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />}
        />
        <Route
          path="/favoritos"
          element={
            <ProtectRoute>
              <Favoritos />
            </ProtectRoute>
          }
        />

        <Route
          path="/minha-conta"
          element={
            <ProtectRoute>
              <MinhaConta />
            </ProtectRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectRoute>
              <Admin />
            </ProtectRoute>
          }
        />

        <Route
          path="/admin/editar/:id"
          element={
            <ProtectRoute>
              <AdminEditar />
            </ProtectRoute>
          }
        />
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
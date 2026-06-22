import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Detalhes from './pages/Detalhes'
import Favoritos from './pages/Favoritos'
import Admin from './pages/Admin'
import AdminEditar from './pages/AdminEditar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/movie/:id" element={<Detalhes />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/editar/:id" element={<AdminEditar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
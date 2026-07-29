import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectRoute from "./components/ProtectRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Account from "./pages/Account";
import Search from "./pages/Search";
import Movies from "./pages/Movies";
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
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/forgot-password" element={<ForgotPassword />}
        />
        <Route
          path="/favorites"
          element={
            <ProtectRoute>
              <Favorites />
            </ProtectRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectRoute>
              <Account />
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
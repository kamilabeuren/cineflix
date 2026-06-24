import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-cineflix.png";

function Navbar() {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top px-4"
      style={{
        background: "rgba(0,0,0,0.9)",
        height: "70px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link className="navbar-brand m-0 p-0" to="/">
          <img
            src={logo}
            alt="CineFlix"
            style={{ height: "50px", objectFit: "contain" }}
          />
        </Link>

        <div className="d-flex gap-4">
          <Link
            to="/"
            className="text-white text-decoration-none fw-semibold nav-link-custom"
          >
            Início
          </Link>
          <Link
            to="/filmes"
            className="text-white text-decoration-none fw-semibold nav-link-custom"
          >
            Filmes
          </Link>
          <Link
            to="/series"
            className="text-white text-decoration-none fw-semibold nav-link-custom"
          >
            Séries
          </Link>
        </div>

        {location.pathname === "/login" ? (
          <Link
            to="/cadastro"
            className="btn btn-danger fw-bold px-3 py-1"
            style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }}
          >
            Criar conta
          </Link>
        ) : (
          <Link
            to="/login"
            className="btn btn-danger fw-bold px-3 py-1"
            style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }}
          >
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
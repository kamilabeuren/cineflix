import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-cineflix.png";

function Navbar() {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top px-4"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.98), rgba(0,0,0,0.95), rgba(0,0,0,0.92))",
        height: "90px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}
    >
      <div className="container-fluid">

        {/* LOGO */}
        <Link className="navbar-brand p-0 m-0 d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="CineFlix"
            style={{ height: "80px", objectFit: "contain" }}
          />
        </Link>

        {/* LINKS CENTRALIZADOS */}
        <div className="d-flex gap-4 mx-auto">
          <Link
            to="/"
            className={`text-decoration-none fw-semibold ${
              location.pathname === "/" ? "text-danger" : "text-white"
            }`}
          >
            Início
          </Link>

          <Link
            to="/filmes"
            className={`text-decoration-none fw-semibold ${
              location.pathname === "/filmes" ? "text-danger" : "text-white"
            }`}
          >
            Filmes
          </Link>

          <Link
            to="/series"
            className={`text-decoration-none fw-semibold ${
              location.pathname === "/series" ? "text-danger" : "text-white"
            }`}
          >
            Séries
          </Link>
        </div>

        {/* BOTÃO */}
        <Link
          to={location.pathname === "/login" ? "/cadastro" : "/login"}
          className="btn btn-danger btn-sm fw-bold px-3"
        >
          {location.pathname === "/login" ? "Criar conta" : "Entrar"}
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaChevronRight,
  FaFilm,
  FaHeart,
  FaRegUser,
  FaSearch,
  FaTv,
} from "react-icons/fa";
import logo from "../assets/logo-cineflix.png";

function Navbar() {
  const [mostrarBusca, setMostrarBusca] = useState(false);
  const [busca, setBusca] = useState("");

  const inputBuscaRef = useRef(null);
  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado")
  );

  const primeiroNome =
    usuarioLogado?.nome?.split(" ")[0] || "";

  const inicialNome =
    usuarioLogado?.nome?.charAt(0)?.toUpperCase() || "";

  const alternarBusca = () => {
    setMostrarBusca((buscaAberta) => {
      if (!buscaAberta) {
        setTimeout(() => inputBuscaRef.current?.focus(), 100);
      }

      return !buscaAberta;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!busca.trim()) return;

    navigate(`/search?q=${encodeURIComponent(busca)}`);
  };

  return (
    <>
      <nav className="navbar navbar-cineflix fixed-top px-3 px-sm-4">
        <div className="container-fluid">
          <div className="row align-items-center w-100">
            <div className="col-2 col-sm-4">
              <button
                className="btn text-white border-0 p-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#menuLateral"
                aria-label="Abrir menu"
              >
                <FaBars size={28} />
              </button>
            </div>

            <div className="col-4 col-sm-4 text-center">
              <Link to="/">
                <img
                  src={logo}
                  alt="CineFlix"
                  className="navbar-logo"
                />
              </Link>
            </div>

            <div className="col-6 col-sm-4 d-flex justify-content-end align-items-center gap-2 gap-sm-3">
              <form
                className={`search-wrapper ${
                  mostrarBusca ? "open" : ""
                }`}
                role="search"
                onSubmit={handleSearch}
              >
                <button
                  type="button"
                  className="search-button"
                  onClick={alternarBusca}
                >
                  <FaSearch size={14} />
                </button>

                <input
                  ref={inputBuscaRef}
                  type="text"
                  className="form-control search-input"
                  placeholder="Buscar filme ou série"
                  value={busca}
                  onChange={(e) =>
                    setBusca(e.target.value)
                  }
                  tabIndex={mostrarBusca ? 0 : -1}
                />
              </form>

              <div className="navbar-divider" />

              <Link
                to={
                  usuarioLogado
                    ? "/minha-conta"
                    : "/login"
                }
                className="btn text-white border-0 p-0"
              >
                <FaRegUser size={22} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start menu-cineflix"
        tabIndex="-1"
        id="menuLateral"
      >
        <div className="menu-login-area">
          <button
            type="button"
            className="btn-close btn-close-white menu-close"
            data-bs-dismiss="offcanvas"
            aria-label="Fechar menu"
          ></button>

          {!usuarioLogado ? (
            <>
              <h5>Já tem uma conta CineFlix?</h5>

              <p>Seu login único no nosso universo</p>

              <Link
                to="/login"
                className="menu-login-button"
              >
                Entrar
              </Link>
            </>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: "55px",
                  height: "55px",
                  backgroundColor: "#7b001c",
                  color: "#fff",
                  fontSize: "1.2rem",
                  flexShrink: 0,
                }}
              >
                {inicialNome}
              </div>

              <div>
                <div className="fw-bold text-white">
                  {primeiroNome}
                </div>

                <Link
                  to="/minha-conta"
                  className="text-decoration-none text-warning"
                >
                  Minha Conta
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="offcanvas-body menu-body">
          <nav className="menu-links">
            <Link
              to="/filmes"
            >
              <FaFilm />
              <span>Filmes</span>
              <FaChevronRight className="menu-arrow" />
            </Link>

            <Link
              to="/series"
              data-bs-dismiss="offcanvas"
            >
              <FaTv />
              <span>Séries</span>
              <FaChevronRight className="menu-arrow" />
            </Link>

            {usuarioLogado && (
              <Link
                to="/favoritos"
              >
                <FaHeart />
                <span>Meus Favoritos</span>
                <FaChevronRight className="menu-arrow" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
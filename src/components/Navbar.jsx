import { useEffect, useRef, useState } from "react";
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
  const searchRef = useRef(null);

  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado")
  );

  const nomeUsuario =
    usuarioLogado?.nome || usuarioLogado?.name || "";

  const primeiroNome =
    nomeUsuario.split(" ")[0] || "";

  const inicialNome =
    nomeUsuario.charAt(0).toUpperCase();

    const alternarBusca = () => {
    setMostrarBusca((estadoAtual) => {
      if (!estadoAtual) {
        setTimeout(() => {
          inputBuscaRef.current?.focus();
        }, 100);
      }
      return !estadoAtual;
    });
  };

  useEffect(() => {
    const fecharBusca = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setMostrarBusca(false);
      }
    };

    document.addEventListener(
      "mousedown",
      fecharBusca
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        fecharBusca
      );
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!busca.trim()) return;
    navigate(
      `/search?q=${encodeURIComponent(busca)}`
    );
    setMostrarBusca(false);
    setBusca("");
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
              >
                <FaBars size={28}/>
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
            <div className="col-6 col-sm-4 d-flex justify-content-end align-items-center gap-2">
              <form
                ref={searchRef}
                className={`search-wrapper ${
                  mostrarBusca ? "open" : ""
                }`}
                onSubmit={handleSearch}
              >
              {mostrarBusca && (
                <input
                  ref={inputBuscaRef}
                  type="text"
                  className="form-control search-input"
                  placeholder="Buscar filme ou série"
                  value={busca}
                  onChange={(e)=>
                    setBusca(e.target.value)
                  }
                />
                )}

                <button
                  type={mostrarBusca ? "submit" : "button"}
                  className="search-button"
                  onClick={!mostrarBusca ? alternarBusca : undefined}
                  aria-label="Pesquisar"
                >
                  <FaSearch size={14} />
                </button>
              </form>
              <Link
                to={
                  usuarioLogado
                  ? "/account"
                  : "/login"
                }
                className="btn text-white border-0 p-0"
              >
                <FaRegUser size={22}/>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start menu-cineflix"
        id="menuLateral"
      >
        <div className="menu-login-area">
          <button
            className="btn-close btn-close-white menu-close"
            data-bs-dismiss="offcanvas"
          />
          {!usuarioLogado ? (
            <>
              <h5>
                Já tem uma conta CineFlix?
              </h5>
              <p>
                Seu login único no nosso universo
              </p>
              <Link
                to="/login"
                className="menu-login-button"
              >
                Entrar
              </Link>
            </>
          ) : (

            <div className="menu-user-info">
              <div className="menu-user-avatar">
                {inicialNome}
              </div>

              <div className="menu-user-details">
                <div className="menu-user-name">
                  {primeiroNome}
                </div>

                <Link
                  to="/account"
                  className="menu-user-account"
                >
                  Minha Conta
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="offcanvas-body menu-body">
          <nav className="menu-links">
            <Link to="/Movies">
              <FaFilm/>
              <span>Filmes</span>
              <FaChevronRight className="menu-arrow"/>
            </Link>
            <Link to="/series">
              <FaTv/>
              <span>Séries</span>
              <FaChevronRight className="menu-arrow"/>
            </Link>

            {usuarioLogado && (
              <Link to="/favorites">
                <FaHeart/>
                <span>Meus Favoritos</span>
                <FaChevronRight className="menu-arrow"/>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
import { Link } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaRegUser,
} from "react-icons/fa";
import logo from "../assets/logo-cineflix.png";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-cineflix fixed-top px-4">
        <div className="container-fluid d-flex align-items-center justify-content-between">

          <button
            className="btn text-white border-0 p-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#menuLateral"
          >
            <FaBars size={28} />
          </button>

          <Link
            to="/"
            className="position-absolute start-50 translate-middle-x"
          >
            <img
              src={logo}
              alt="CineFlix"
              className="logo-cineflix"
            />
          </Link>

          <div className="d-flex align-items-center gap-3">

            <button
              className="btn text-white border-0 p-0"
            >
              <FaSearch size={22} />
            </button>

            <div className="navbar-divider"></div>

            <Link
              to="/login"
              className="btn text-white border-0 p-0"
            >
            <FaRegUser size={22} />
            </Link>

          </div>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start text-bg-dark"
        tabIndex="-1"
        id="menuLateral"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">
            CineFlix
          </h5>

          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <div className="d-flex flex-column gap-4">

            <Link
              to="/"
              className="text-white text-decoration-none"
            >
              Início
            </Link>

            <Link
              to="/filmes"
              className="text-white text-decoration-none"
            >
              Filmes
            </Link>

            <Link
              to="/series"
              className="text-white text-decoration-none"
            >
              Séries
            </Link>

            <Link
              to="/favoritos"
              className="text-white text-decoration-none"
            >
              Favoritos
            </Link>

            <Link
              to="/conta"
              className="text-white text-decoration-none"
            >
              Minha Conta
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
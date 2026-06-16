import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo-cineflix.png";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top px-4"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))",
        height: "70px",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand m-0 p-0" to="/">
          <img
            src={logo}
            alt="CineFlix"
            className="img-fluid"
            style={{ maxHeight: "100px" }}
          />
        </Link>

        <Link
            to="/cadastro"
            className="text-white text-decoration-none fw-bold"
            style={{
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
        }}
        >
          Cadastre-se agora
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
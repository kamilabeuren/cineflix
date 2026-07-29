import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import logo from "../assets/logo-cineflix.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === "admin@cineflix.com" &&
      password === "123456"
    ) {
      const admin = {
        name: "Administrador",
        email: "admin@cineflix.com",
        role: "admin",
      };

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(admin)
      );

      navigate("/account");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("usuario")
    );

    if (
      user &&
      email === user.email &&
      password === user.password
    ) {
      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(user)
      );

      navigate("/account");
    } else {
      alert("E-mail ou senha inválidos");
    }
  };

  return (
    <>
      <div
        className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          background:
            "radial-gradient(ellipse at center, #2b2b2b 0%, #111111 40%, #000000 80%)",
        }}
      >
        <div
          className="card bg-dark text-light border-0 shadow"
          style={{
            width: "100%",
            maxWidth: "450px",
          }}
        >
          <div className="card-body p-4 p-md-5">

            <div className="text-center mb-4">
              <Link to="/">
                <img
                  src={logo}
                  alt="CineFlix"
                  className="login-logo"
                />
              </Link>
            </div>

            <p className="text-center text-secondary mb-4">
              Digite seu endereço de e-mail e senha para continuar.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <FormInput
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <FormInput
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>


              <div className="text-end mb-3">
                <Link
                  to="/forgot-password"
                  className="text-white-50 text-decoration-none"
                >
                  Esqueceu sua senha?
                </Link>
              </div>


              <button
                type="submit"
                className="btn btn-danger w-100 fw-bold"
              >
                Entrar
              </button>

            </form>

            <hr />

            <p className="text-center mb-0">
              Não possui conta?{" "}
              <Link
                to="/register"
                className="text-white fw-bold text-decoration-none"
              >
                Cadastre-se
              </Link>
            </p>

            <p className="text-center mb-0">
              Para testar: e-mail admin@cineflix.com e senha 123456
            </p>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
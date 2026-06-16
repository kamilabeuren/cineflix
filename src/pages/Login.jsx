import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === "admin@cineflix.com" &&
      senha === "123456"
    ) {
      localStorage.setItem("usuarioLogado", "true");
      navigate("/");
    } else {
      alert("E-mail ou senha inválidos");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
        style={{
          background:
            "radial-gradient(ellipse at center, #10224d 0%, #050b1c 35%, #000000 75%)",
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
            <h1 className="text-center fw-bold mb-3">
              Entre
            </h1>

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
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="text-end mb-3">
                <Link
                  to="#"
                  className="text-decoration-none text-secondary"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Entrar
              </button>
            </form>

            <hr />

            <p className="text-center mb-0">
              Não possui conta?{" "}
              <Link
                to="/cadastro"
                className="text-decoration-none"
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
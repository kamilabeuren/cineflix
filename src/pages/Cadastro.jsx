import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const novoUsuario = {
      nome,
      email,
      senha,
      role: "user",
    };

    localStorage.setItem(
      "usuario",
      JSON.stringify(novoUsuario)
    );

    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card bg-dark text-white p-4 shadow"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Criar Conta</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormInput
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="text-center text-secondary mb-3">
            <FormInput
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-center text-secondary mb-3">
            <FormInput
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="text-center text-secondary mb-3">
            <FormInput
              type="password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100 rounded-pill"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Já possui conta?{" "}
          <Link to="/login" className="text-white fw-bold text-decoration-none">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role: "user",
    };

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    toast.success("Cadastro realizado com sucesso!");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center text-secondary mb-3">
            <FormInput
              type="password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default Register;
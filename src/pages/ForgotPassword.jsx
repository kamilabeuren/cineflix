import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Informe seu e-mail.");
      return;
    }

    toast.success(
      "Se o e-mail estiver cadastrado, você receberá instruções para recuperação de senha."
    );

    setEmail("");
  };

  return (
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
          <h2 className="text-center fw-bold mb-3">
            Recuperar Senha
          </h2>

          <p className="text-center text-secondary mb-4">
            Digite seu e-mail para receber instruções de recuperação de senha.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <FormInput
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-danger w-100 fw-bold"
            >
              Enviar
            </button>
          </form>

          <hr />

          <p className="text-center mb-0">
            Lembrou sua senha?{" "}
            <Link
              to="/login"
              className="text-white fw-bold text-decoration-none"
            >
              Voltar para login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
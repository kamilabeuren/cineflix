import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

function MinhaConta() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    nascimento: "",
    genero: "",
    senha: "",
  });

  useEffect(() => {
    const usuarioLogado = JSON.parse(
      localStorage.getItem("usuarioLogado")
    );

    if (usuarioLogado) {
      setUsuario(usuarioLogado);
    }
  }, []);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSalvar = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(usuario)
    );

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuario)
    );

    alert("Dados atualizados com sucesso!");
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  return (
    <div
      className="container py-5 text-light"
      style={{
        minHeight: "100vh",
        marginTop: "80px",
        maxWidth: "1000px",
      }}
    >
      <h1 className="fw-bold mb-1">
        Minha Conta
      </h1>

      <p className="text-secondary mb-5">
        Gerencie seus dados cadastrais
      </p>

      <form onSubmit={handleSalvar}>
        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label">
              Nome completo
            </label>

            <FormInput
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={usuario.nome}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              E-mail
            </label>

            <FormInput
              type="email"
              name="email"
              placeholder="E-mail"
              value={usuario.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Data de nascimento
            </label>

            <FormInput
              type="date"
              name="nascimento"
              value={usuario.nascimento || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Gênero
            </label>

            <select
              name="genero"
              value={usuario.genero || ""}
              onChange={handleChange}
              className="form-select bg-dark text-light border-secondary"
            >
              <option value="">
                Selecione
              </option>

              <option value="Feminino">
                Feminino
              </option>

              <option value="Masculino">
                Masculino
              </option>

              <option value="Outro">
                Outro
              </option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Nova senha
            </label>

            <FormInput
              type="password"
              name="senha"
              placeholder="Nova senha"
              value={usuario.senha || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Confirmar senha
            </label>

            <FormInput
              type="password"
              placeholder="Confirmar senha"
            />
          </div>
        </div>

        <div className="mt-5 d-flex gap-3">
          <button
            type="submit"
            className="btn btn-danger px-4"
          >
            Salvar alterações
          </button>

          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handleLogout}
          >
            Sair da conta
          </button>
        </div>
      </form>
    </div>
  );
}

export default MinhaConta;
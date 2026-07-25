import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";

function MinhaConta() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    nascimento: "",
    genero: "",
    senha: "",
  });

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");


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


  const validarDataNascimento = (data) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    const resultado = data?.match(regex);

    if (!resultado) {
      return {
        valido: false,
        mensagem: "Digite a data no formato DD/MM/AAAA.",
      };
    }


    const dia = Number(resultado[1]);
    const mes = Number(resultado[2]);
    const ano = Number(resultado[3]);


    const dataNascimento = new Date(
      ano,
      mes - 1,
      dia
    );


    // Verifica se a data existe
    if (
      dataNascimento.getDate() !== dia ||
      dataNascimento.getMonth() !== mes - 1 ||
      dataNascimento.getFullYear() !== ano
    ) {
      return {
        valido: false,
        mensagem: "Digite uma data de nascimento válida.",
      };
    }


    // Calcula idade
    const hoje = new Date();

    let idade =
      hoje.getFullYear() - ano;


    const aindaNaoFezAniversario =
      hoje.getMonth() < mes - 1 ||
      (
        hoje.getMonth() === mes - 1 &&
        hoje.getDate() < dia
      );


    if (aindaNaoFezAniversario) {
      idade--;
    }


    if (idade < 18) {
      return {
        valido: false,
        mensagem: "É necessário ter 18 anos ou mais.",
      };
    }


    return {
      valido: true,
      mensagem: "",
    };
  };



  const handleSalvar = (e) => {
    e.preventDefault();


    if (!usuario.nome.trim()) {
      toast.error("Informe seu nome completo!");
      return;
    }


    const resultadoData = validarDataNascimento(
      usuario.nascimento
    );


    if (!resultadoData.valido) {
      toast.error(resultadoData.mensagem);
      return;
    }



    // Só altera senha se preencher
    if (novaSenha) {

      if (novaSenha !== confirmarSenha) {
        toast.error("As senhas não conferem!");
        return;
      }

    }

    const usuarioAtualizado = {
      ...usuario,
      senha: novaSenha || usuario.senha,
    };

    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(usuarioAtualizado)
    );

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuarioAtualizado)
    );

    setUsuario(usuarioAtualizado);
    setNovaSenha("");
    setConfirmarSenha("");

    toast.success("✅ Dados atualizados com sucesso!");
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");

    toast.info("👋 Você saiu da conta.");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
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
              value={usuario.email}
              readOnly
            />

          </div>

          <div className="col-md-6">

            <label className="form-label">
              Data de nascimento
            </label>

            <FormInput
              type="text"
              name="nascimento"
              placeholder="DD/MM/AAAA"
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
              className="form-select bg-dark text-white border-secondary"
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
              placeholder="Digite uma nova senha"
              value={novaSenha}
              onChange={(e) =>
                setNovaSenha(e.target.value)
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Confirmar nova senha
            </label>
            <FormInput
              type="password"
              name="confirmarSenha"
              placeholder="Confirme a nova senha"
              value={confirmarSenha}
              onChange={(e) =>
                setConfirmarSenha(e.target.value)
              }
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
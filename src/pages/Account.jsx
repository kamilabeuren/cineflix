import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";

function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    birthDate: "",
    gender: "",
    password: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const loggedUser = JSON.parse(
      localStorage.getItem("usuarioLogado")
    );

    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);


  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };


  const validateBirthDate = (date) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    const result = date?.match(regex);

    if (!result) {
      return {
        valid: false,
        message: "Digite a data no formato DD/MM/AAAA.",
      };
    }

    const day = Number(result[1]);
    const month = Number(result[2]);
    const year = Number(result[3]);


    const birthDate = new Date(
      year,
      month - 1,
      day
    );


    if (
      birthDate.getDate() !== day ||
      birthDate.getMonth() !== month - 1 ||
      birthDate.getFullYear() !== year
    ) {
      return {
        valid: false,
        message: "Digite uma data de nascimento válida.",
      };
    }


    const today = new Date();

    let age =
      today.getFullYear() - year;


    const hasNotHadBirthday =
      today.getMonth() < month - 1 ||
      (
        today.getMonth() === month - 1 &&
        today.getDate() < day
      );


    if (hasNotHadBirthday) {
      age--;
    }


    if (age < 18) {
      return {
        valid: false,
        message: "É necessário ter 18 anos ou mais.",
      };
    }


    return {
      valid: true,
      message: "",
    };
  };


  const handleSave = (e) => {
    e.preventDefault();


    if (!user.name.trim()) {
      toast.error("Informe seu nome completo!");
      return;
    }


    const birthDateResult = validateBirthDate(
      user.birthDate
    );


    if (!birthDateResult.valid) {
      toast.error(birthDateResult.message);
      return;
    }


    if (newPassword) {

      if (newPassword !== confirmPassword) {
        toast.error("As senhas não conferem!");
        return;
      }

    }


    const updatedUser = {
      ...user,
      password: newPassword || user.password,
    };


    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(updatedUser)
    );


    localStorage.setItem(
      "usuario",
      JSON.stringify(updatedUser)
    );


    setUser(updatedUser);
    setNewPassword("");
    setConfirmPassword("");

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

      <form onSubmit={handleSave}>

        <div className="row g-4">

          <div className="col-md-6">

            <label className="form-label">
              Nome completo
            </label>

            <FormInput
              type="text"
              name="name"
              placeholder="Nome completo"
              value={user.name}
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
              value={user.email}
              readOnly
            />

          </div>


          <div className="col-md-6">

            <label className="form-label">
              Data de nascimento
            </label>

            <FormInput
              type="text"
              name="birthDate"
              placeholder="DD/MM/AAAA"
              value={user.birthDate || ""}
              onChange={handleChange}
            />

          </div>


          <div className="col-md-6">

            <label className="form-label">
              Gênero
            </label>

            <select
              name="gender"
              value={user.gender || ""}
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
              name="password"
              placeholder="Digite uma nova senha"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

          </div>


          <div className="col-md-6">

            <label className="form-label">
              Confirmar nova senha
            </label>

            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Confirme a nova senha"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
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

export default Account;
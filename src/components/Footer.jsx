import { FaFacebookF, FaXTwitter, FaTiktok } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer
      className="mt-5 py-5"
      style={{
        backgroundColor: "#000",
        borderTop: "1px solid #222",
      }}
    >
      <div className="container text-center">
        <div className="d-flex flex-wrap justify-content-center gap-4 mb-4">
          <a href="#" className="text-decoration-none text-light">
            Acessibilidade
          </a>

          <a href="#" className="text-decoration-none text-light">
            Política de Privacidade
          </a>

          <a href="#" className="text-decoration-none text-light">
            Termos de Uso
          </a>

          <a href="#" className="text-decoration-none text-light">
            Gerenciar Cookies
          </a>

          <a href="#" className="text-decoration-none text-light">
            Ajuda
          </a>
        </div>

        {/* Direitos autorais */}
        <p
          className="mb-4"
          style={{
            color: "#999",
            fontSize: "0.9rem",
          }}
        >
          © 2026 CineFlix. Todos os direitos reservados.
        </p>

        <div className="d-flex justify-content-center gap-4">
          <a href="#" className="text-light">
            <FaFacebookF size={22} />
          </a>

          <a href="#" className="text-light">
            <FaXTwitter size={22} />
          </a>

          <a href="#" className="text-light">
            <FaTiktok size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
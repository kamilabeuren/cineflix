import { Link } from "react-router-dom";
import banner from "../assets/banner.jpg";

const HeroBanner = () => {
  return (
    <div
      className="position-relative text-white d-flex align-items-end"
      style={{
        height: "min(70vh, 520px)",
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      
      <div
        className="w-100 p-4 p-md-5"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
        }}
      >
        <h1 className="fw-bold display-5">
          Filmes que você vai adorar
        </h1>

        <p className="text-light col-12 col-md-6 d-none d-md-block">
          Os melhores filmes, séries e histórias em um só lugar.
        </p>

        <Link className="btn btn-danger mt-3">
          Explorar agora
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
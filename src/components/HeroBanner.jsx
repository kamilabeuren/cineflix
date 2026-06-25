import { Link } from "react-router-dom";
import banner from "../assets/banner.jpg";

const HeroBanner = () => {
  return (
    <div
      className="position-relative overflow-hidden"
      style={{
        height: "min(85vh, 520px)",
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "12px",
      }}
    >

    <div
      className="position-absolute w-100 h-100"
      style={{
        top: 0,
        left: 0,
        background:
          "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 25%, transparent 60%)",
      }}
    />

    <div
      className="position-absolute w-100 text-center text-white"
      style={{
        bottom: "20px",
        zIndex: 2,
      }}
    >

    <h1
      className="fw-bold mb-3"
      style={{
        fontSize: "3rem",
        textShadow:"0 4px 12px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.8)",
      }}
    >
      Filmes que você vai adorar!
    </h1>

    <p
      className="mx-auto mb-4"
      style={{
        maxWidth: "600px",
        fontSize: "1.1rem",
        textShadow: "0 2px 8px rgba(0,0,0,0.9)",
      }}
    >
      Os melhores filmes, séries e histórias em um só lugar.
    </p>

    <Link className="btn btn-danger px-4 py-2">
      Explorar agora
    </Link>
    </div>
  </div>
  );
};

export default HeroBanner;
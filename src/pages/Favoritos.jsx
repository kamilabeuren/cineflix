import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Footer from "../components/Footer";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const usuarioLogado = JSON.parse(
      localStorage.getItem("usuarioLogado")
    );

    if (!usuarioLogado) return;

    const chave = `favoritos_${usuarioLogado.email}`;

    const lista =
      JSON.parse(localStorage.getItem(chave)) || [];

    setFavoritos(lista);
  }, []);

  const abrirModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const fecharModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  const removerFavorito = (id) => {
    const usuarioLogado = JSON.parse(
      localStorage.getItem("usuarioLogado")
    );

    if (!usuarioLogado) return;

    const chave = `favoritos_${usuarioLogado.email}`;

    const novaLista = favoritos.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      chave,
      JSON.stringify(novaLista)
    );

    setFavoritos(novaLista);

    toast.info("Removido dos favoritos 🗑️");
  };

  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-white text-center fw-bold mb-5">
        Meus favoritos
      </h1>

      <div className="row">
        {favoritos.length > 0 ? (
          favoritos.map((movie) => (
            <div
              key={movie.id}
              className="col-6 col-md-3 mb-4"
            >
              <MovieCard
                movie={movie}
                onMovieClick={abrirModal}
              />
            </div>
          ))
        ) : (
          <p className="text-white text-center">
            Você ainda não possui favoritos.
          </p>
        )}
      </div>

      <MovieModal
        show={showModal}
        handleClose={fecharModal}
        movie={selectedMovie}
        favorito={true}
        onRemoveFavorite={removerFavorito}
      />

      <Footer />
    </div>
  );
}

export default Favoritos;
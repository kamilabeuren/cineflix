import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Footer from "../components/Footer";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(
      localStorage.getItem("usuarioLogado")
    );

    if (!loggedUser) return;

    const storageKey = `favoritos_${loggedUser.email}`;

    const list =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    setFavorites(list);
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  const removeFavorite = (id) => {
    const loggedUser = JSON.parse(
      localStorage.getItem("usuarioLogado")
    );

    if (!loggedUser) return;

    const storageKey = `favoritos_${loggedUser.email}`;

    const newList = favorites.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      storageKey,
      JSON.stringify(newList)
    );

    setFavorites(newList);

    toast.info("Removido dos favoritos 🗑️");
  };

  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-white text-center fw-bold mb-5">
        Meus favoritos
      </h1>

      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div
              key={movie.id}
              className="col-6 col-md-3 mb-4"
            >
              <MovieCard
                movie={movie}
                onMovieClick={openModal}
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
        handleClose={closeModal}
        movie={selectedMovie}
        favorito={true}
        onRemoveFavorite={removeFavorite}
      />

      <Footer />
    </div>
  );
}

export default Favorites;
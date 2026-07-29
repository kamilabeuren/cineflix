import { useEffect, useState } from "react";
import MovieSection from "../components/MovieSection";
import MovieModal from "../components/MovieModal";
import Footer from "../components/Footer";

const apiKey = import.meta.env.VITE_API_KEY;

function Movies() {
  const [action, setAction] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [adventure, setAdventure] = useState([]);
  const [drama, setDrama] = useState([]);
  const [family, setFamily] = useState([]);
  const [comedy, setComedy] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const fetchMoviesByGenre = async (genreId, setState) => {
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?${apiKey}&with_genres=${genreId}&language=pt-BR`;

      const response = await fetch(url);
      const data = await response.json();

      setState(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchMoviesByGenre(28, setAction),
      fetchMoviesByGenre(16, setAnimation),
      fetchMoviesByGenre(12, setAdventure),
      fetchMoviesByGenre(18, setDrama),
      fetchMoviesByGenre(10751, setFamily),
      fetchMoviesByGenre(35, setComedy),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="container pt-5 mt-5 pb-5">

        <div className="text-center mb-5 pt-4">
          <h2 className="text-white fw-bold mb-3">
            Filmes por gênero
          </h2>

          <p className="text-light mb-0">
            Abaixo você encontra todo o acervo de filmes
            organizado por gêneros.
          </p>

          <p className="text-light mb-0">
            Não estão inclusos os filmes que ainda vão estrear no Brasil.
          </p>
        </div>

        <MovieSection
          title="Filmes de Ação"
          movies={action}
          loading={loading}
          onMovieClick={openModal}
        />

        <MovieSection
          title="Filmes de Animação"
          movies={animation}
          loading={loading}
          onMovieClick={openModal}
        />

        <MovieSection
          title="Filmes de Aventura"
          movies={adventure}
          loading={loading}
          onMovieClick={openModal}
        />

        <MovieSection
          title="Filmes de Drama"
          movies={drama}
          loading={loading}
          onMovieClick={openModal}
        />

        <MovieSection
          title="Filmes Infantis"
          movies={family}
          loading={loading}
          onMovieClick={openModal}
        />

        <MovieSection
          title="Filmes de Comédia"
          movies={comedy}
          loading={loading}
          onMovieClick={openModal}
        />

      </div>

      <MovieModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        movie={selectedMovie}
      />

      <Footer />
    </>
  );
}

export default Movies;
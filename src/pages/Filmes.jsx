import { useEffect, useState } from "react";
import MovieSection from "../components/MovieSection";
import MovieModal from "../components/MovieModal";
import Footer from "../components/Footer";

const apiKey = import.meta.env.VITE_API_KEY;

function Filmes() {
  const [acao, setAcao] = useState([]);
  const [animacao, setAnimacao] = useState([]);
  const [aventura, setAventura] = useState([]);
  const [drama, setDrama] = useState([]);
  const [infantil, setInfantil] = useState([]);
  const [comedia, setComedia] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openMovie = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const getMoviesByGenre = async (genreId, setState) => {
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
      getMoviesByGenre(28, setAcao),
      getMoviesByGenre(16, setAnimacao),
      getMoviesByGenre(12, setAventura),
      getMoviesByGenre(18, setDrama),
      getMoviesByGenre(10751, setInfantil),
      getMoviesByGenre(35, setComedia),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="container pt-5 mt-5 pb-5">

        <div className="text-center mb-5 pt-4">
          <h2 className="text-white fw-bold mb-3">Filmes por gênero</h2>

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
          movies={acao}
          loading={loading}
          onMovieClick={openMovie}
        />

        <MovieSection
          title="Filmes de Animação"
          movies={animacao}
          loading={loading}
          onMovieClick={openMovie}
        />

        <MovieSection
          title="Filmes de Aventura"
          movies={aventura}
          loading={loading}
          onMovieClick={openMovie}
        />

        <MovieSection
          title="Filmes de Drama"
          movies={drama}
          loading={loading}
          onMovieClick={openMovie}
        />

        <MovieSection
          title="Filmes Infantis"
          movies={infantil}
          loading={loading}
          onMovieClick={openMovie}
        />

        <MovieSection
          title="Filmes de Comédia"
          movies={comedia}
          loading={loading}
          onMovieClick={openMovie}
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

export default Filmes;

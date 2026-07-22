import { useEffect, useState } from "react";
import MovieSection from "../components/MovieSection";
import MovieModal from "../components/MovieModal";
import Footer from "../components/Footer";

const apiKey = import.meta.env.VITE_API_KEY;

function Series() {
  const [acaoAventura, setAcaoAventura] = useState([]);
  const [animacao, setAnimacao] = useState([]);
  const [comedia, setComedia] = useState([]);
  const [drama, setDrama] = useState([]);
  const [familia, setFamilia] = useState([]);
  const [crime, setCrime] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openMovie = (serie) => {
    setSelectedMovie(serie);
    setShowModal(true);
  };

  const getSeriesByGenre = async (genreId, setState) => {
    try {
      const url = `https://api.themoviedb.org/3/discover/tv?${apiKey}&with_genres=${genreId}&language=pt-BR`;

      const response = await fetch(url);
      const data = await response.json();

      setState(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar séries:", error);
    }
  };

  useEffect(() => {
    Promise.all([
      getSeriesByGenre(10759, setAcaoAventura), // Ação e Aventura
      getSeriesByGenre(16, setAnimacao),        // Animação
      getSeriesByGenre(35, setComedia),         // Comédia
      getSeriesByGenre(18, setDrama),           // Drama
      getSeriesByGenre(10751, setFamilia),      // Família
      getSeriesByGenre(80, setCrime),           // Crime
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="container pt-5 mt-5 pb-5">

        <div className="text-center mb-5 pt-4">
          <h2 className="text-white fw-bold mb-3">
            Séries por gênero
          </h2>

          <p className="text-light mb-0">
            Explore séries organizadas por gênero.
          </p>
          <p className="text-light mb-0">
            Encontre facilmente as melhores produções
            de ação, comédia, drama, animação e muito mais.
          </p>
        </div>

        <MovieSection
          title="Séries de Ação e Aventura"
          movies={acaoAventura}
          loading={loading}
          onMovieClick={openMovie}
        />

        <MovieSection
          title="Séries de Animação"
          movies={animacao}
          loading={loading}
          onMovieClick={openMovie}
        />

        <MovieSection
          title="Séries de Comédia"
          movies={comedia}
          loading={loading}
          onMovieClick={openMovie}
        />

        <MovieSection
          title="Séries de Drama"
          movies={drama}
          loading={loading}
          onMovieClick={openMovie}
        />

        <MovieSection
          title="Séries para Família"
          movies={familia}
          loading={loading}
          onMovieClick={openMovie}
        />

        <MovieSection
          title="Séries Policiais"
          movies={crime}
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

export default Series;
import { useEffect, useState } from "react";
import MovieSection from "../components/MovieSection";
import MovieModal from "../components/MovieModal";
import Footer from "../components/Footer";

const apiKey = import.meta.env.VITE_API_KEY;

function Series() {
  const [actionAdventure, setActionAdventure] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [drama, setDrama] = useState([]);
  const [family, setFamily] = useState([]);
  const [crime, setCrime] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (serie) => {
    setSelectedMovie(serie);
    setShowModal(true);
  };

  const fetchSeriesByGenre = async (genreId, setState) => {
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
      fetchSeriesByGenre(10759, setActionAdventure),
      fetchSeriesByGenre(16, setAnimation),
      fetchSeriesByGenre(35, setComedy),
      fetchSeriesByGenre(18, setDrama),
      fetchSeriesByGenre(10751, setFamily),
      fetchSeriesByGenre(80, setCrime),
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
          movies={actionAdventure}
          loading={loading}
          onMovieClick={openModal}
        />

        <MovieSection
          title="Séries de Animação"
          movies={animation}
          loading={loading}
          onMovieClick={openModal}
        />

        <MovieSection
          title="Séries de Comédia"
          movies={comedy}
          loading={loading}
          onMovieClick={openModal}
        />

        <MovieSection
          title="Séries de Drama"
          movies={drama}
          loading={loading}
          onMovieClick={openModal}
        />

        <MovieSection
          title="Séries para Família"
          movies={family}
          loading={loading}
          onMovieClick={openModal}
        />

        <MovieSection
          title="Séries Policiais"
          movies={crime}
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

export default Series;
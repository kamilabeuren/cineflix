import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieModal from "../components/MovieModal";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const query = searchParams.get("q");

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) return;

      setLoading(true);  

      try {
        const url = `${searchURL}?${apiKey}&query=${encodeURIComponent(
          query
        )}&language=pt-BR`;

        const response = await fetch(url);
        const data = await response.json();

        console.log("Resposta da API:", data); // debug no console
        setMovies(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <div className="container mt-5 pt-4">
      <h2 className="title text-white mb-4">
        Resultados para: <span className="query-text">{query}</span>
      </h2>

      <div className="movies-container row g-3">
        {loading && <LoadingSpinner />}

        {!loading && movies.length === 0 && (
          <p className="text-light">Nenhum resultado encontrado.</p>
        )}

        {!loading &&
          movies.length > 0 &&
          movies.map((movie) => (
            <div key={movie.id} className="col-6 col-md-3">
              <MovieCard
                movie={movie}
                onMovieClick={handleOpenModal}
              />
            </div>
          ))}
      </div>

      <MovieModal
        show={showModal}
        handleClose={handleCloseModal}
        movie={selectedMovie}
      />
    </div>
  );
};

export default Search;

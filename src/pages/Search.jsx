import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH; // https://api.themoviedb.org/3/search/movie
const apiKey = import.meta.env.VITE_API_KEY;   // api_key=xxxxxx

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="container mt-5 pt-4">
      <h2 className="title text-white mb-4">
        Resultados para: <span className="query-text">{query}</span>
      </h2>

      <div className="movies-container row g-3">
        {loading && <p className="text-light">Carregando...</p>}

        {!loading && movies.length === 0 && (
          <p className="text-light">Nenhum resultado encontrado.</p>
        )}

        {!loading &&
          movies.length > 0 &&
          movies.map((movie) => (
            <div key={movie.id} className="col-6 col-md-3">
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;

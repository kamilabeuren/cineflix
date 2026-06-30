import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTopRatedMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTopMovies(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const url = `${moviesURL}top_rated?${apiKey}`;
    getTopRatedMovies(url);
  }, []);

  return (
    <div className="container-fluid px-4 py-5">
      <HeroBanner />

    <div className="mt-5">
      <div className="d-flex align-items-center mb-4">
        <div
          style={{
            width: "5px",
            height: "32px",
            backgroundColor: "#ffc107",
            borderRadius: "4px",
            marginRight: "12px",
          }}
        />
        <h4 className="fw-bold text-white mb-0">
          Melhores Filmes
        </h4>
      </div>
    </div>

  <div className="row g-3">

        <div className="row g-2">
          {loading && (
            <p className="text-center text-light">
              Carregando...
            </p>
          )}

          {!loading &&
            topMovies.slice(0, 4).map((movie) => (
              <div
                key={movie.id}
                className="col-6 col-md-3"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
        </div>
      </div>
      <div className="mt-5"></div>

    </div>
  );
};

export default Home;
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTopMovies(data.results);
  };

  useEffect(() => {
    const url = `${moviesURL}top_rated?${apiKey}`;
    getTopRatedMovies(url);
  }, []);

  return (
    <div className="container-fluid px-4 py-4">

        <HeroBanner />

        <h3 className="mt-4 mb-3 fw-bold">
            Melhores Filmes
        </h3>

        <div className="row g-3">
            {topMovies.length === 0 && (
                <p className="text-center text-light">
                Carregando...
                </p>
        )}

        {topMovies.map((movie) => (
          <div
            key={movie.id}
            className="col-6 col-sm-4 col-md-3 col-lg-2"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Home;
import { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";
import MovieModal from "../components/MovieModal";
import Footer from "../components/Footer";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [featuredSeries, setFeaturedSeries] = useState([]);
  const [newSeries, setNewSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openMovie = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const getMovies = async (url, setState) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setState(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    const nowPlayingUrl = `${moviesURL}now_playing?${apiKey}`;
    const newSeriesUrl = `https://api.themoviedb.org/3/tv/on_the_air?${apiKey}`;
    const featuredSeriesUrl = `https://api.themoviedb.org/3/trending/tv/week?${apiKey}`;

    Promise.all([
      getMovies(topRatedUrl, setTopMovies),
      getMovies(nowPlayingUrl, setNewMovies),
      getMovies(newSeriesUrl, setNewSeries),
      getMovies(featuredSeriesUrl, setFeaturedSeries),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-fluid px-4 py-5">
      <HeroBanner />

      <MovieSection
        title="Melhores Filmes"
        movies={topMovies}
        loading={loading}
        onMovieClick={openMovie}
      />

      <MovieSection
        title="Lançamentos"
        movies={newMovies}
        loading={loading}
        onMovieClick={openMovie}
      />

      <MovieSection
        title="Séries em Destaque"
        movies={featuredSeries}
        loading={loading}
        onMovieClick={openMovie}
      />

      <MovieSection
        title="Lançamento de Séries"
        movies={newSeries}
        loading={loading}
        onMovieClick={openMovie}
      />

      <MovieModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        movie={selectedMovie}
      />

      <Footer />
    </div>
  );
};

export default Home;
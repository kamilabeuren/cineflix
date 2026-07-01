import { useState, useEffect } from "react";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [featuredSeries, setFeaturedSeries] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const featuredSeriesUrl =
    `https://api.themoviedb.org/3/trending/tv/week?${apiKey}`;

    Promise.all([
      getMovies(topRatedUrl, setTopMovies),
      getMovies(nowPlayingUrl, setNewMovies),
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
      />

      <MovieSection
        title="Lançamentos"
        movies={newMovies}
        loading={loading}
      />

      <MovieSection
      title="Séries em Destaque"
      movies={featuredSeries}
      loading={loading}
    />
    </div>
  );
};

export default Home;
import { Link } from "react-router-dom";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">

      <img
        src={
          movie.poster_path
            ? imageUrl + movie.poster_path
            : "https://via.placeholder.com/500x750"
        }
        alt={movie.title}
      />

      <div className="movie-overlay">
        <h6 className="movie-title text-truncate">
          {movie.title}
        </h6>
      </div>

    </Link>
  );
};

export default MovieCard;
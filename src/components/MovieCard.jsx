import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card card h-100 border-0 shadow-sm bg-dark text-light">
      <img
        src={
          movie.poster_path
            ? imageUrl + movie.poster_path
            : "https://via.placeholder.com/500x750"
        }
        className="card-img-top"
        alt={movie.title}
      />

      <div className="card-body">
        <h6 className="card-title text-truncate">
          {movie.title}
        </h6>

        <p className="mb-0">
          <FaStar className="text-warning" /> {movie.vote_average}
        </p>

        <Link
          to={`/movie/${movie.id}`}
          className="btn btn-sm btn-outline-light mt-2 w-100"
        >
          Detalhes
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
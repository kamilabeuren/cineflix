const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, onMovieClick }) => {
  const title = movie.title || movie.name || "Título indisponível";

  return (
    <div
      className="movie-card"
      onClick={() => onMovieClick?.(movie)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={
          movie.poster_path
            ? imageUrl + movie.poster_path
            : "https://via.placeholder.com/500x750"
        }
        alt={title}
      />

      <div className="movie-overlay">
        <h6 className="movie-title text-truncate">
          {title}
        </h6>
      </div>
    </div>
  );
};

export default MovieCard;

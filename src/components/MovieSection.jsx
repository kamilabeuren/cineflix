import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";

const MovieSection = ({
  title,
  movies,
  loading,
  onMovieClick,
}) => {
  return (
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
          {title}
        </h4>
      </div>

      <div className="row g-2">
        {loading ? (
          <LoadingSpinner />
        ) : (
          movies.slice(0, 4).map((movie) => (
            <div
              key={movie.id}
              className="col-6 col-md-3"
            >
              <MovieCard
                movie={movie}
                onMovieClick={onMovieClick}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieSection;
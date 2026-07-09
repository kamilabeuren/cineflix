const imageUrl = import.meta.env.VITE_IMG;

function MovieModal({ show, handleClose, movie }) {
  if (!show || !movie) return null;

  const title = movie.title || movie.name || "Título indisponível";
  const description =
    movie.overview || "Descrição indisponível para este título.";
  const imagePath = movie.backdrop_path || movie.poster_path;

  return (
    <div
      className="movie-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-modal-title"
      onClick={handleClose}
    >
      <div
        className="movie-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="movie-modal-close"
          onClick={handleClose}
          aria-label="Fechar modal"
        >
          ×
        </button>

        {imagePath && (
          <img
            src={imageUrl + imagePath}
            alt={title}
            className="movie-modal-image"
          />
        )}

        <div className="movie-modal-content">
          <h2 id="movie-modal-title">{title}</h2>
          <p>{description}</p>

          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handleClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;

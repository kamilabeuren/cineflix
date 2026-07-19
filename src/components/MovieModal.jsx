const imageUrl = import.meta.env.VITE_IMG;

function MovieModal({
  show,
  handleClose,
  movie,
  favorito = false,
  onRemoveFavorite,
}) {
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

          <div className="d-flex gap-2 mt-3">

            {favorito ? (
              
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  onRemoveFavorite(movie.id);
                  handleClose();
                }}
              >
                Remover dos favoritos
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  const usuarioLogado = JSON.parse(
                    localStorage.getItem("usuarioLogado")
                  );

                  if (!usuarioLogado) {
                    alert("Faça login para adicionar favoritos.");
                    return;
                  }

                  const chave = `favoritos_${usuarioLogado.email}`;

                  const favoritos =
                    JSON.parse(localStorage.getItem(chave)) || [];

                  const existe = favoritos.some(
                    (item) => item.id === movie.id
                  );

                  if (!existe) {
                    favoritos.push(movie);

                    localStorage.setItem(
                      chave,
                      JSON.stringify(favoritos)
                    );
                  }

                  alert("Filme adicionado aos favoritos!");
                }}
              >
                Adicionar aos favoritos
              </button>
            )}

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
    </div>
  );
}
export default MovieModal;

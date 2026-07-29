import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  useEffect(() => {
    const movieUrl = `${movieURL}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, [id]);

  return (
    <div className="container text-white mt-5">
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
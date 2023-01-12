import { Link } from "react-router-dom";

export const Movie = ({ movie }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <Link to={`/movie-details/${movie.id}`}>
      <img
        src={`${IMAGE_BASE_URL}${movie.poster || movie.poster_path}`}
        alt={movie.title}
      />
    </Link>
  );
};

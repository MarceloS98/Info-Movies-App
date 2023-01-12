import { getMovies } from "./";

export const fetchMovies = () => {
  const trending = fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" +
      import.meta.env.VITE_API_KEY
  ).then((res) => res.json());
  const popular = fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=" +
      import.meta.env.VITE_API_KEY
  ).then((res) => res.json());
  const upcoming = fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=" +
      import.meta.env.VITE_API_KEY
  ).then((res) => res.json());

  const allData = Promise.all([trending, popular, upcoming]);

  return allData.then((data) => data.map((el) => getMovies(el)));
};

import { useEffect, useState } from "react";
import { Carousel, Genres, Hero } from "../components";
import { fetchMovies, getGenres } from "../helpers";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const getResults = async () => {
    const movies = await fetchMovies(import.meta.env.VITE_API_KEY);
    setMovies(movies);

    const genres = await getGenres(import.meta.env.VITE_API_KEY);
    setGenres(genres);
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
      <main className="bg-black pb-10">
        <Hero data={movies[0]?.results} />
        <Carousel data={movies[0]?.results} title="Trending" />
        <Genres data={genres} />
        <Carousel data={movies[1]?.results} title="Popular" />
        <Carousel data={movies[2]?.results} title="Upcoming" />
      </main>
    </>
  );
};

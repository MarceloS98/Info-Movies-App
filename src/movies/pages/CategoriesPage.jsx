import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";

import { Genres, MoviesGrid, Pagination } from "../components/";
import { getGenres } from "../helpers";

export const Categories = () => {
  const location = useLocation();
  const { page = 1 } = queryString.parse(location.search);
  const [currentPage, setCurrentPage] = useState(page);
  const [genres, setGenres] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const { id } = useParams();

  const getGenresResults = async () => {
    const genres = await getGenres(import.meta.env.VITE_API_KEY);
    setGenres(genres);
  };

  const getGenreMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=${page}&with_genres=${id}`
    );
    const data = await res.json();
    setGenreMovies(data);
  };

  useEffect(() => {
    getGenresResults();
  }, []);

  useEffect(() => {
    getGenreMovies();
  }, [id, page]);

  useEffect(() => {
    setCurrentPage(Number(page));
  }, [page]);

  return (
    <>
      <main className="min-h-screen bg-black py-2 lg:py-10">
        <Genres data={genres} />
        <MoviesGrid data={genreMovies.results} />
        <Pagination
          page={page}
          currentPage={currentPage}
          totalPages={
            genreMovies.total_pages <= 500 ? genreMovies.total_pages : 500
          }
        />
      </main>
    </>
  );
};

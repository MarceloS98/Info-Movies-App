import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";

import { MoviesGrid, Pagination } from "../components";
import { useForm } from "../../hooks/useForm";

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = "", page = 1 } = queryString.parse(location.search);

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();

    if (searchText.trim().length <= 1) return;

    getMovies(page);
    navigate(`?q=${searchText}&page=1`);
  };

  const getMovies = async (page) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&query=${searchText}&page=${page}`
    );
    const data = await res.json();
    setMovies(data);
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  useEffect(() => {
    setCurrentPage(Number(page));
  }, [page]);

  return (
    <>
      <main className="min-h-screen bg-black pb-10">
        <div className="flex flex-col items-center justify-between gap-4 px-5 pt-10 md:container lg:flex-row">
          <h1 className="text-3xl font-bold text-white">Find that movie</h1>
          <form className="flex" onSubmit={onSearchSubmit}>
            <input
              type="text"
              className="rounded-l-md border border-r-0 border-white px-2 sm:w-60"
              name="searchText"
              placeholder="Search for a movie"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="rounded-r-lg bg-red-500 py-2 px-4 font-bold text-white">
              Search
            </button>
          </form>
        </div>

        {q !== "" && movies.results?.length === 0 ? (
          <div className="mx-auto mt-20 w-fit bg-red-500 px-5 py-3 text-white">
            No movie named <b>{q}</b>
          </div>
        ) : (
          q === "" && (
            <div className="mx-auto mt-20 w-fit bg-red-500 px-5 py-3 font-bold text-white">
              Nothing to display
            </div>
          )
        )}
        <MoviesGrid data={movies.results} />

        {q !== "" && (
          <Pagination
            page={page}
            currentPage={currentPage}
            totalPages={movies.total_pages <= 500 ? movies.total_pages : 500}
            q={searchText}
          />
        )}
      </main>
    </>
  );
};

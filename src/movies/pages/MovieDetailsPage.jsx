import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const navigate = useNavigate();
  const onNavigateBack = () => {
    navigate(-1);
  };

  const isActive = ({ isActive }) => {
    const className =
      "shrink-0 rounded-md py-1 px-3 text-white hover:bg-red-500";
    return isActive ? `${className} bg-red-500` : `${className} bg-gray-700 `;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setSimilarMovies(data));
  }, []);

  const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <main className="min-h-screen bg-black">
        <div className="mx-auto flex max-w-md flex-col py-10 px-5 sm:grid sm:max-w-none sm:grid-cols-12 md:container">
          <div className="sm:col-span-4 ">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full"
            />
          </div>

          <div className="w-auto text-slate-300 sm:col-span-8 sm:col-start-6">
            <h1 className="mt-5 text-4xl font-bold text-slate-200 sm:mt-0">
              {movie.title}
            </h1>
            <p className="mb-2 font-bold">{movie.tagline}</p>
            <div className="flex gap-2 overflow-x-scroll lg:flex-wrap lg:overflow-auto">
              {movie.genres?.map((genre) => {
                return (
                  <NavLink
                    key={genre.id}
                    to={`/categories/${genre.id}?page=1`}
                    id={genre.id}
                    className={isActive}
                  >
                    {genre.name}
                  </NavLink>
                );
              })}
            </div>
            <h2 className="mt-5 text-3xl font-bold text-slate-200">Sinopsis</h2>
            <p className="mt-2">{movie.overview}</p>

            <h2 className="mt-5 text-3xl font-bold text-slate-200">Details</h2>
            <ul className="flex flex-col items-start">
              <li className="inline border-b border-slate-400 py-2 pr-10">
                <strong>Release Date: </strong>
                <span>{movie.release_date}</span>
              </li>
              <li className="inline border-b border-slate-400 py-2 pr-10">
                <strong>Runtime: </strong>
                <span>{movie.runtime} min</span>
              </li>
              <li className="inline border-b border-slate-400 py-2 pr-10">
                <strong>Revenue: </strong>
                <span>{currencyFormat.format(movie.revenue)}</span>
              </li>

              <li className="inline border-b border-slate-400 py-2 pr-10">
                <strong>Production companies: </strong>
                <ul>
                  {movie.production_companies?.map((company) => (
                    <li className="ml-5" key={company.id}>
                      {company.name}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="inline border-b border-slate-400 py-2 pr-10">
                <strong>Produced in: </strong>
                {movie.production_countries?.map((country) => (
                  <span key={country.iso_3166_1}>{country.name}</span>
                ))}
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              <a
                href={movie.homepage}
                className="rounded-md bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Official website
              </a>
              <button
                onClick={onNavigateBack}
                className="rounded-md bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

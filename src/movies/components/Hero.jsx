import { useEffect } from "react";
import { Link } from "react-router-dom";

const index = Math.round(Math.random() * 19);

export const Hero = ({ data = [] }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";
  const movie = data[index] || [];

  return (
    <>
      <div className="w-full">
        <div className="absolute left-0 h-screen w-full bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute left-0 h-screen w-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
        {/* Movie info */}
        <div className="absolute my-auto flex h-full w-full flex-col items-center justify-center gap-3 px-5 text-white md:px-0 md:pb-0 lg:grid lg:auto-rows-min lg:content-center">
          {/* Rating */}
          <div className="flex gap-3 lg:container">
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-star text-xl text-red-500" />
              <p className="text-xl">{movie.rating?.toFixed(1)}</p>
            </div>
            <span className="self-center text-2xl">•</span>
            {/* Label */}
            <span className="rounded-md bg-red-500 py-1 px-3 text-white">
              Trending
            </span>
          </div>
          {/* Title and Sinopsis */}
          <div className="lg:container">
            <h3 className="mb-2 text-center text-4xl font-bold lg:text-left lg:text-5xl">
              {movie.title}
            </h3>
            <p className="mx-auto hidden w-5/6 text-center text-xl sm:block md:w-4/6 lg:mx-0 lg:text-left">
              {movie.overview}
            </p>
          </div>
          {/* Buttons */}
          <div className="flex items-stretch gap-4 lg:container">
            <div className="rounded-md bg-red-500 py-1 px-3 text-white hover:bg-red-700 sm:text-lg">
              <i className="fa-solid fa-play mr-1" />
              <button>Play Trailer</button>
            </div>
            {/* Details */}
            <div className="rounded-md bg-gray-500 py-1 px-3 text-white hover:bg-gray-700 sm:text-lg">
              <i className="fa-solid fa-circle-info mr-1" />
              <Link to={`/movie-details/${movie.id}`}>See Details</Link>
            </div>
          </div>
        </div>
        {/* Background img */}
        <picture>
          <source
            srcSet={`${IMAGE_BASE_URL}${movie.poster}`}
            media="(orientation: portrait)"
          />
          <source
            srcSet={`${IMAGE_BASE_URL}${movie.backdrop}`}
            media="(orientation: landscape)"
          />
          <img
            src={`${IMAGE_BASE_URL}${movie.backdrop}`}
            alt={movie.title}
            className="h-screen w-full object-cover object-top pt-16"
          />
        </picture>
      </div>
    </>
  );
};

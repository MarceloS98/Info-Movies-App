import { Movie } from "../components";

export const MoviesGrid = ({ data = [] }) => {
  return (
    <>
      <div className="mx-auto mt-10 grid max-w-screen-2xl grid-cols-2 gap-3 px-5 sm:grid-cols-3 md:container lg:grid-cols-4 xl:grid-cols-5">
        {data.map(
          (movie) => movie.poster_path && <Movie key={movie.id} movie={movie} />
        )}
      </div>
    </>
  );
};

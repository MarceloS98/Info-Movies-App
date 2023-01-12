import { NavLink, useParams } from "react-router-dom";

export const Genres = ({ data = [] }) => {
  const isActive = ({ isActive }) => {
    const className =
      "shrink-0 rounded-md py-1 px-3 text-white hover:bg-red-500";
    return isActive ? `${className} bg-red-500` : `${className} bg-gray-700 `;
  };

  return (
    <>
      <div className="mb-10 overflow-hidden md:container lg:mb-20">
        <h2 className="mb-4 px-5 text-2xl font-bold text-white md:p-0 lg:text-center lg:text-3xl">
          Categories
        </h2>
        <div className="flex gap-2 overflow-x-scroll px-5 md:p-0 lg:flex-wrap lg:justify-center lg:overflow-auto">
          {data.map((genre) => {
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
      </div>
    </>
  );
};

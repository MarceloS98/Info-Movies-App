import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Navbar } from "../../ui/components/Navbar";
import { Categories, Home, MovieDetails, Search } from "../pages";

export const MoviesRouter = () => {
  let { pathname } = useLocation();

  return (
    <>
      <Navbar path={pathname} />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/categories/" element={<Navigate to="./28?page=1" />} />
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
};

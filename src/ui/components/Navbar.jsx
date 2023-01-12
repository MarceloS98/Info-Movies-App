import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";

export const Navbar = ({ path }) => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();
  const { user, onLogout } = useContext(AuthContext);

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
  };

  const isActive = ({ isActive }) => {
    return isActive ? "text-red-500" : "";
  };

  const onToggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <header
      className={`${
        path === "/" ? "fixed z-10" : "sticky z-10"
      } w-full bg-black shadow-md shadow-neutral-900`}
    >
      <nav className="mx-auto grid py-5 sm:grid-flow-col sm:px-5 md:container">
        <div className="flex items-center justify-between px-5 sm:p-0">
          {/* Logo */}
          <NavLink
            to="/"
            className="shrink-0 text-center font-['Roboto_Condensed'] text-2xl font-bold uppercase text-red-500"
          >
            my movies db
          </NavLink>

          {/* Burguer menu */}
          <button
            className="text-2xl text-white sm:hidden"
            onClick={onToggleNav}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {/* Mobile nav links */}
        <div className={`${!showNav ? "hidden" : ""} pt-5 sm:hidden`}>
          <ul className="grid justify-center gap-2 text-center text-white">
            <NavLink to="/" className={isActive}>
              Home
            </NavLink>
            <NavLink to="/categories" className={isActive}>
              Categories
            </NavLink>
            <NavLink to="/search" className={isActive}>
              Search
            </NavLink>
          </ul>

          <div className="font-lg mx-auto mt-5 flex w-fit items-center gap-x-5 border-t-4 border-red-500 pt-5 ">
            <span className="font-bold text-white">{user.name}</span>
            <button
              onClick={handleLogout}
              className="rounded-sm bg-red-500 py-1 px-3 font-bold text-white"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden justify-center gap-x-5 text-lg text-white sm:flex ">
          <li>
            <NavLink to="/" className={isActive}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={isActive}>
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={isActive}>
              Search
            </NavLink>
          </li>
        </ul>

        <div className="font-lg hidden items-center justify-end gap-x-5 sm:flex ">
          <span className="font-bold text-blue-300">{user.name}</span>
          <button onClick={handleLogout} className="font-bold text-white">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

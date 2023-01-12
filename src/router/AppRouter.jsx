import { Route, Routes } from "react-router-dom";
import { Login } from "../auth/pages/LoginPage";
import { MoviesRouter } from "../movies/routes/MoviesRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <MoviesRouter />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
};

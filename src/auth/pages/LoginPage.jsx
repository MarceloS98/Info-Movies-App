import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [showExplanation, setshowExplanation] = useState(false);
  const { onLogin } = useContext(AuthContext);

  const handleLogin = () => {
    onLogin();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div className="mx-auto flex h-screen w-full flex-col items-center justify-center bg-black px-5">
        <h1 className="mb-4 border-b-2 border-red-500 pb-2 text-4xl font-bold uppercase text-white">
          Login
        </h1>

        <div
          className={`${
            !showExplanation ? "hidden" : ""
          } max-w-[330px] text-center text-lg text-white`}
        >
          <p>
            This login page is made for demonstration purposes. It allows the
            implementation of protected routes.
          </p>
          <p className="mt-4">
            Try going to the{" "}
            <Link className="border-b-2 border-red-500 font-bold " to="/">
              Home Page
            </Link>{" "}
            without login in; it won't let you.
          </p>
        </div>

        <div>
          <button
            onClick={() => setshowExplanation(!showExplanation)}
            className="mt-5 mr-3 rounded-lg bg-red-500 px-4 py-2 font-bold text-white transition-colors hover:bg-red-600"
          >
            {showExplanation ? "Hide Explanation" : "Why login?"}
          </button>
          <button
            onClick={handleLogin}
            className="mt-5 rounded-lg bg-red-500 px-4 py-2 font-bold text-white transition-colors hover:bg-red-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

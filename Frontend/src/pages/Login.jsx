import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const { loginInfo, updateLogininfo, loginUser, loginError, isLoginLoading, clearLoginError } =
    useContext(AuthContext);

  const deleteErrorMessage = () => {
    clearLoginError();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white mb-2">
            Welcome back!
          </h1>
          <p className="text-slate-400 font-sans">MyChat App for everybody</p>
        </div>

        <form onSubmit={loginUser} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => updateLogininfo({ ...loginInfo, email: e.target.value })}
              className="w-full border-2 border-cyan-600 rounded-lg p-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => updateLogininfo({ ...loginInfo, password: e.target.value })}
              className="w-full border-2 border-cyan-600 rounded-lg p-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-8 py-3 rounded-lg w-full sm:w-auto hover:bg-cyan-700 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-opacity-50 font-semibold"
            >
              {isLoginLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          {loginError && (
            <div className="flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <p className="text-sm">{loginError.message}</p>
              <button
                type="button"
                onClick={deleteErrorMessage}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTimes} className="cursor-pointer" />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

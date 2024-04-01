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
    <>
      <div className="px-1 py-24 lg:px-16">
        <div className="flex items-center justify-center px-20  flex-col">
          <span className="text-2xl md:text-3xl lg:text-4xl font-merriweather">Welcome back!</span>
          <span className="text-slate-500 font-Nunito">Mychat App for everybody</span>
        </div>
        <div className="flex items-center justify-center px-24 pt-3">
          <form onSubmit={loginUser} className="flex flex-col w-[30rem]">
            <div className="flex flex-col mb-3">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => updateLogininfo({ ...loginInfo, email: e.target.value })}
                className="border-2 border-tahiti-600 rounded-lg p-2 text-black"
              />
            </div>
            <div className="flex flex-col mb-3">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => updateLogininfo({ ...loginInfo, password: e.target.value })}
                className="border-2 border-tahiti-600 rounded-lg p-2 text-black"
              />
            </div>
            <div className="flex justify-center mb-4 items-center">
              <button
                type="submit"
                className="bg-tahiti-600 text-white p-2 rounded-lg w-28 md:w-48 hover:bg-tahiti-900 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-tahiti-900 focus:ring-opacity-50"
              >
                {isLoginLoading ? "Loggin in" : "Login"}
              </button>
            </div>
            {loginError && (
              <div
                className="flex justify-between items-center bg-red-100 border border-red-100 text-red-700 px-4 py-5 rounded relative "
                role="alert"
              >
                <p className="inline-block">{loginError.message}</p>
                <span>
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={deleteErrorMessage}
                    className="cursor-pointer"
                  />
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

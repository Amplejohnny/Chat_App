import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { registerInfo, updateRegisterinfo, registerUser, registerError, isRegisterLoading } =
    useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white">Sign up</h1>
        </div>

        <form onSubmit={registerUser} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="saint4eva"
              onChange={(e) => updateRegisterinfo({ ...registerInfo, username: e.target.value })}
              className="w-full border-2 border-cyan-600 rounded-lg p-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="example123@gmail.com"
              onChange={(e) => updateRegisterinfo({ ...registerInfo, email: e.target.value })}
              className="w-full border-2 border-cyan-600 rounded-lg p-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="JohnDoe1234$"
              onChange={(e) => updateRegisterinfo({ ...registerInfo, password: e.target.value })}
              className="w-full border-2 border-cyan-600 rounded-lg p-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-8 py-3 rounded-lg w-full sm:w-auto hover:bg-cyan-700 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-opacity-50 font-semibold"
            >
              {isRegisterLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>

          {registerError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <p className="text-sm">{registerError.message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;

import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Notification from "./chat/Notification";

const NavBar = () => {
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-3 px-4 md:px-16 bg-black mb-3">
      <span className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">
        <Link to="/" className="text-teal-400 hover:text-teal-600">
          My Chat App
        </Link>
      </span>

      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-7">
        {user && (
          <span className="text-orange-500 text-sm sm:text-base">
            Logged In as {user?.data?.username}
          </span>
        )}

        <div className="flex items-center space-x-4 sm:space-x-7">
          {user && (
            <>
              <Notification />
              <Link
                onClick={() => logOutUser()}
                to="/login"
                className="text-white hover:text-cyan-400 transition-colors text-sm sm:text-base"
              >
                Logout
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link
                to="/login"
                className="text-white hover:text-cyan-400 transition-colors text-sm sm:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-cyan-400 transition-colors text-sm sm:text-base"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

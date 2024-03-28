import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const NavBar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center py-4 pr-6 pl-4 md:pr-28 md:pl-16 bg-black">
      <span className="text-2xl font-bold">
        <Link to="/" className="text-bermuda hover:text-tahiti-900">
          My Chat App
        </Link>
      </span>
      {user && <span className="text-orange">Logged In as {user?.data?.username}</span>}
      <span className="space-x-7">
        {user && (
          <>
            <Link onClick={() => logOutUser()} to="/login" className="hover:text-cyan-400">
              Logout
            </Link>
          </>
        )}
        {!user && (
          <>
            <Link to="/login" className="hover:text-cyan-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-cyan-400">
              Register
            </Link>
          </>
        )}
      </span>
    </div>
  );
};

export default NavBar;

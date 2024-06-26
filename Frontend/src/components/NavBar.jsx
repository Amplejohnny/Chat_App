import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Notification from "./chat/Notification";
const NavBar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center py-3 pr-6 pl-4 md:pr-28 md:pl-16 bg-black mb-3">
      <span className="text-2xl font-bold">
        <Link to="/" className="text-bermuda hover:text-tahiti-900">
          My Chat App
        </Link>
      </span>
      {user && <span className="text-orange">Logged In as {user?.data?.username}</span>}
      <span className="space-x-7 flex">
        {user && (
          <>
            <Notification />
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

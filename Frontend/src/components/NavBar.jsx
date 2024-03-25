const NavBar = () => {
  return (
    <div className="flex justify-between items-center py-2 px-16">
      <div className="text-2xl font-bold">Chat App</div>
      <div>
        <button>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
};

export default NavBar;

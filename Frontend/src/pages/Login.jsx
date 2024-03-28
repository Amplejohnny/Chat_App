const Login = () => {
  return (
    <>
      <div className="px-1 py-16 lg:px-16">
        <div className="flex items-center justify-center px-20 text-2xl md:text-3xl lg:text-4xl font-merriweather ">
          Sign in
        </div>
        <div className="flex items-center justify-center px-24 pt-1">
          <form className="flex flex-col w-[30rem]">
            <div className="flex flex-col mb-2">
              <label className="">Email</label>
              <input
                type="email"
                placeholder="example123@gamil.com"
                className="border-2 border-tahiti-600 rounded-lg p-2 text-black"
              />
            </div>
            <div className="flex flex-col mb-3">
              <label className="">Password</label>
              <input
                type="text"
                placeholder="JohnDoe1234$"
                className="border-2 border-tahiti-600 rounded-lg p-2 text-black"
              />
            </div>
            <div className="flex justify-center mb-4 items-center">
              <button
                type="submit"
                className="bg-tahiti-600 text-white p-2 rounded-lg w-28 lg:w-48 hover:bg-tahiti-900 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-tahiti-900 focus:ring-opacity-50"
              >
                Login
              </button>
            </div>
            <div
              className="bg-red-100 border border-red-100 text-red-700 px-4 py-3 rounded relative "
              role="alert"
            >
              <p className="block md:inline">An error occurred</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

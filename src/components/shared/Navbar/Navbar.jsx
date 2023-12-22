import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../../utils/context/AuthProvider";

const Navbar = () => {
  const { user, loading, SignOutUser } = useContext(authContext);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>All Task</Link>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
          </ul>
        </div>
        <Link to={"/"} className=" text-2xl font-semibold">
          <span className="text-primary">Task.</span>ly
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/dashboard"}>All Task</Link>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="">
          {loading ? (
            <span className="loading loading-ring loading-md scale-150 mr-5"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={`${
                      user.photoURL
                        ? user.photoURL
                        : "https://i.ibb.co/rHzPb0S/icon-256x256.png"
                    }`}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="font-bold">{user.displayName}</a>
                </li>
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={SignOutUser} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={"/login"} className="btn bg-primary text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

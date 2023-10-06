import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import taskContext from "../context/taskContext";

const Navbar = () => {
  const { mode, setUIMode, user, getUser } = useContext(taskContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("taskmate-token")) {
      getUser();
    }
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("taskmate-token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="container bg-transparent py-3 fixed top-0 left-5 md:left-10 px-2">
      <div className="nav flex justify-between">
        <div
          className="nav-brand font-bold text-rose-500 text-opacity-90 text-3xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hidden md:block"
          style={{ fontFamily: "Croissant One" }}
        >
          <Link to="/">TaskMate</Link>
        </div>
        <div className="nav-items flex space-x-16 md:space-x-5">
          {localStorage.getItem("taskmate-token") ? (
            <button
              className="tracking-wide text-slate-500 underline mt-1 hover:text-black"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="tracking-wide text-slate-500 underline mt-1 hover:text-black"
            >
              Login
            </Link>
          )}
          <div className="font-bold text-slate-900 text-base tracking-wider mt-2.5 hover:text-rose-500 hover:scale-125 duration-300">
            <span>{user ? user.name : "User Name"}</span>
          </div>
          <div className="icon text-2xl text-slate-700 bg-slate-200 p-2 rounded-full cursor-pointer shadow shadow-slate-700 transition ease-in-out delay-150 hover:-translate-y-1 duration-300">
            {mode === "light" ? (
              <BiSolidMoon onClick={setUIMode} />
            ) : (
              <BiSolidSun onClick={setUIMode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

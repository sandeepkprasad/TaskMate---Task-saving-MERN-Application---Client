import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [cred, setCred] = useState({ username: "", password: "" });
  let navigate = useNavigate();

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "http://localhost:5000/auth/login";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: cred.username,
        password: cred.password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("taskmate-token", json.jwtData);
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="container mx-auto">
      <div className="w-full h-[80vh] flex justify-center items-center">
        <div className="md:w-1/3  bg-rose-200 border-2 border-slate-100 rounded-lg p-3 flex justify-center">
          <div className="w-full px-2 space-y-10">
            <h3 className="font-bold text-slate-900 text-3xl text-center">
              Login to Your Account
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="username"
                    className="font-bold text-base text-slate-700"
                  >
                    Userame
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={cred.username}
                    placeholder="Enter Username"
                    className="p-1 border-2 border-slate-200 rounded-lg w-2/3"
                    onChange={handleChange}
                    minLength={6}
                    required
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="password"
                    className="font-bold text-base text-slate-700"
                  >
                    Password
                  </label>
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={cred.password}
                    placeholder="Enter Password"
                    className="p-1 border-2 border-slate-200 rounded-lg w-2/3"
                    onChange={handleChange}
                    minLength={8}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="font-bold bg-rose-500 text-white hover:bg-rose-700 duration-300 rounded-lg px-3 py-1.5"
              >
                Login
              </button>
            </form>
            <p className="font-medium text-sm text-slate-500 tracking-wide">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-700">
                Create here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

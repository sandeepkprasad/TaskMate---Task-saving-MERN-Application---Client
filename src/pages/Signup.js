import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [cred, setCred] = useState({ name: "", username: "", password: "" });
  let navigate = useNavigate();

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let url = "http://localhost:5000/auth/signup";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cred.name,
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
    <div className="container mx-auto py-10">
      <div className="w-full h-[80vh] flex justify-center items-center">
        <div className="md:w-1/3 bg-rose-200 border-2 border-slate-100 rounded-lg p-3">
          <div className="w-full px-2 space-y-10">
            <h3 className="font-bold text-slate-900 text-3xl text-center">
              Create Your Account
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="name"
                    className="font-bold text-base text-slate-700"
                  >
                    Full Name
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={cred.name}
                    placeholder="Enter Full Name"
                    className="p-1 border-2 border-slate-200 rounded-lg w-2/3"
                    onChange={handleChange}
                    minLength={4}
                    required
                  />
                </div>
              </div>
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
                Create
              </button>
            </form>
            <p className="font-medium text-sm text-slate-500 tracking-wide">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

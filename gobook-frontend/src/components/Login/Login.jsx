import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setErrorMessage("Both username/email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("user", JSON.stringify(data.user));
          sessionStorage.setItem("token", data.token);
        }
        setErrorMessage("");
        navigate("/");
      } else {
        if (data.error === "User not found. Please register.") {
          setErrorMessage("User not found. Redirecting to Register...");
          setTimeout(() => navigate("/register"), 2000);
        } else {
          setErrorMessage(data.error || "Invalid username or password.");
        }
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again later.");
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white bg-opacity-20 backdrop-blur-sm p-4">
        <h2 className="text-2xl font-semibold mb-5">Login to GoBook</h2>

        {errorMessage && (
          <p className="text-red-600 mb-4 text-sm text-center max-w-sm">{errorMessage}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        >
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-2">
              Username or Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username or email"
              value={credentials.username}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700 cursor-pointer">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
          >
            Login
          </button>

          <div className="my-4 border-t border-gray-300 relative text-center">
            <span className="bg-white px-2 text-sm text-gray-500 absolute -top-2 left-1/2 transform -translate-x-1/2">
              or
            </span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            <FcGoogle size={20} />
            Login with Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2 px-4 mt-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            <HiOutlineMail size={20} />
            Login with Email
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register Here
          </a>
        </p>
      </div>
    </>
  );
};

export default Login;

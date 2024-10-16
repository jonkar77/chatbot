import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated, displayWelcomeMessage }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  useEffect(() => {
    if (loginSuccessful) {
      handleLogin();
    }
  }, [loginSuccessful]);

  const handleLogin = () => {
    document.cookie = "token=true; path=/; max-age=" + 60 * 60 * 24;
    document.cookie = `user=${username}; path=/; max-age=` + 60 * 60 * 24;
    // displayWelcomeMessage(message);
    setIsAuthenticated(true);
    navigate("/");
  };

  const loginUser = async () => {
    if (username) {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          user: username,
          password: password,
        });

        if (response.data) {
          const message = response.data.message ? "Welcome back!" : "Welcome!";
          setMessage(message);

          setLoginSuccessful(true);
        }
      } catch (error) {
        console.error(
          "Error during login:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Welcome!
        </h2>

        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={loginUser}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

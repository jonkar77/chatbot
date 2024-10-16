import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // Clear cookies for logout
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedOut(true);
  };

  // Function to check if the user is an admin
  const isAdmin = () => {
    const cookies = document.cookie.split("; ");
    const userCookie = cookies.find((cookie) => cookie.startsWith("user="));

    if (userCookie) {
      const userValue = userCookie.split("=")[1];
      return userValue === "admin";
    }

    return false;
  };

  // Redirect to login page if logged out
  useEffect(() => {
    if (isLoggedOut) {
      // navigate("/login");
    }
  }, [isLoggedOut, navigate]);

  return (
    <div className="flex justify-between px-4 py-2 bg-indigo-600 text-white">
      <h2 className="text-lg">Chat AI</h2>

      {/* Check if the user is an admin and show the Admin Panel link */}
      {isAdmin() && (
        <Link to="/admin" className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Admin Panel
        </Link>
      )}

      {/* Logout button */}
      <button onClick={handleLogout} className="ml-4 bg-red-600 px-2 py-1 rounded">
        Logout
      </button>
    </div>
  );
};

export default Navbar;

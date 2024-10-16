import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import LoginPage from "./components/Login";
import AdminPanel from "./components/Admin";
import SavedResponse from "./components/ListSavedResponse";

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedInStatus = checkLoggedIn();
    setIsAuthenticated(loggedInStatus);
  }, []);

  const checkLoggedIn = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

    if (tokenCookie) {
      const tokenValue = tokenCookie.split("=")[1];
      return tokenValue === "true";
    }

    return false;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route
          path="/"
          element={
            isAuthenticated ? <App /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated && <AdminPanel />
          }
        />
        <Route
          path="/saved_response"
          element={
            isAuthenticated && <SavedResponse />
          }
        />
      </Routes>
    </Router>
  );
};



export default AppRouter;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Nav/NavBar";
import Home from "./Screens/Home";
import UserLogin from "./Users/UserLogin";
import AuthProvider from "../hooks/AuthContext";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const persistedUser = localStorage.getItem("user");
    return persistedUser ? JSON.parse(persistedUser) : {};
  });

  const isUserLoggedIn = Object.keys(loggedInUser).length !== 0;

  const handleLogout = () => {
    setLoggedInUser({});
    localStorage.removeItem("user");
  };

  return (
    <AuthProvider>
      <Router>
        <div>
          <div id="NavBar">
            <NavBar />
          </div>
          <div id="home">
            {isUserLoggedIn ? <h1>Welcome {loggedInUser.firstName}</h1> : null}
            {isUserLoggedIn ? (
              <button onClick={handleLogout}>Logout</button>
            ) : null}
            <Routes>
              <Route
                path="/"
                element={
                  isUserLoggedIn ? <Home /> : <h1>No User Logged In :c</h1>
                }
              />

              <Route
                path="/login"
                element={
                  <UserLogin
                    setLoggedInUser={setLoggedInUser}
                    loggedInUser={loggedInUser}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
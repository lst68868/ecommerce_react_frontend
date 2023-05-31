import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Nav/NavBar";
import Home from "./Screens/Home";
import UserLogin from "./Users/UserLogin";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  // Check if loggedInUser is an empty object
  const isUserLoggedIn = Object.keys(loggedInUser).length !== 0;

  return (
    <Router>
      <div>
        <div id="NavBar">
          <NavBar />
        </div>
        <div id="home">
          {isUserLoggedIn ? <h1>Welcome {loggedInUser.firstName}</h1> : null}
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
  );
}

export default App;

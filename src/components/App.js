import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Nav/NavBar";
import Home from "./Screens/Home";
import UserLogin from "./Users/UserLogin";
import CreateUser from "./Users/CreateUser";
import AuthProvider from "../hooks/AuthContext";
import "./App.css";

function App() {
  // useEffect(() => {
  //   const persistedUser = localStorage.getItem("user");
  //   if (persistedUser) {
  //     handleLogin(JSON.parse(persistedUser));
  //   }
  // }, []);

  return (
    <AuthProvider>
      <Router>
        <div>
          <div id="NavBar">
            <div className="navbar-container">
              <NavBar />
            </div>
          </div>
          <div id="home">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/create-user" element={<CreateUser />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

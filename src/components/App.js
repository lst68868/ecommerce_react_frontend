import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Nav/NavBar";
import Home from "./Screens/Home";
import UserLogin from "./Users/UserLogin";
import AuthProvider from "../hooks/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <div id="NavBar">
            <NavBar />
          </div>
          <div id="home">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<UserLogin />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { AuthContext } from "../../hooks/AuthContext";

function NavBar() {
  const { loggedInUser, isUserLoggedIn, handleLogout } =
    useContext(AuthContext);
  // console.log("IN NAV COMP");
  // console.log(loggedInUser);
  // console.log("is user logged in? ", isUserLoggedIn);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/create-user">Create User</Link>
        </li>
        {isUserLoggedIn && (
          <li id="logout-container">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
      {isUserLoggedIn && <h1>Welcome {loggedInUser.firstName}</h1>}
    </nav>
  );
}

export default NavBar;

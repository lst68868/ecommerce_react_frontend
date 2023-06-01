import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../hooks/AuthContext";

function NavBar() {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("user");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {loggedInUser ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

import React, { useState } from "react";
import axios from "axios";

function UserLogin(props) {
  const [loginMessage, setLoginMessage] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      const response = await axios.post(
        "https://ecommerce-react-api.herokuapp.com/login",
        user
      );
      props.setLoggedInUser(response.data.User);
      setLoginMessage({ message: "Logged In" });
      localStorage.setItem("user", JSON.stringify(response.data.User));
    } catch (error) {
      setLoginMessage({ message: "User no Login :( ", error });
    }
  };

  return (
    <div id="login-form">
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      <h1>{loginMessage.message}</h1>
    </div>
  );
}

export default UserLogin;

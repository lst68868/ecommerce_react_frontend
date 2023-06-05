import React, { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import "./UserLogin.css";

function UserLogin() {
  const { handleLogin, loginMessage } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    await handleLogin(email, password);
  };
  console.log(loginMessage);
  return (
    <div id="login-form">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      {loginMessage !== undefined && <h1>{loginMessage.message}</h1>}
    </div>
  );
}

export default UserLogin;

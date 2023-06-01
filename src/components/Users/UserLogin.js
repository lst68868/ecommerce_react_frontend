import React, { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext";
function UserLogin() {
  const { handleLogin, loginMessage } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    handleLogin(email, password);
  };

  return (
    <div id="login-form">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      <h1>{loginMessage.message}</h1>
    </div>
  );
}

export default UserLogin;

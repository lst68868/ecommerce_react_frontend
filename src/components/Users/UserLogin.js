import React, { props, useEffect, useState } from "react";
import { login, newUser, deleteUser } from "../../services/Controller";

function UserLogin(props) {
  //   const [loggedInUser, setLoggedInUser] = useState({});
  const [loginMessage, setLoginMessage] = useState({});
  //make a variable that stores a message
  // this will get set in the controller on success
  // on FAILURE (catch block) this message will be failed

  const handleLogin = async (e) => {
    const user = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    await login(user)
      .then((response) => {
        props.setLoggedInUser(response.data.User);
        setLoginMessage({ message: "Logged In" });
      })
      .catch((error) => {
        return setLoginMessage({ message: "User no Login :( ", error });
      });
  };

  console.log(props.loggedInUser);

  return (
    <div id="login-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(e);
        }}
      >
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      <h1>{loginMessage.message}</h1>
    </div>
  );
}

export default UserLogin;

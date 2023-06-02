import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState({});

  const handleLogin = async (email, password) => {
    const user = { email, password };
    try {
      const response = await axios.post(
        "https://ecommerce-react-api.herokuapp.com/login",
        user
      );
      setLoggedInUser(response.data.User);
      setLoginMessage({ message: "Logged In" });
      localStorage.setItem("user", JSON.stringify(response.data.User));
    } catch (error) {
      setLoginMessage({ message: "User not Login :( ", error });
    }
  };

  const contextValue = {
    loggedInUser,
    setLoggedInUser,
    loginMessage,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

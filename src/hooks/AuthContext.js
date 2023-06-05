import React, { createContext, useState, useEffect } from "react";
import { login } from "../services/Controller";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const persistedUser = localStorage.getItem("user");
    return persistedUser ? JSON.parse(persistedUser) : null;
  });

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState({});

  const handleLogin = async (email, password) => {
    const user = { email, password };
    try {
      const response = await login(user);
      if (response.status === 200) {
        //upon success
        setLoggedInUser(response.data.User);
        localStorage.setItem("user", JSON.stringify(response.data.User));
        setLoginMessage({ message: response.data.message });
        setIsUserLoggedIn(true);
      } else {
        setLoginMessage({ message: response.response.data.message });
      }
    } catch (error) {
      setLoginMessage({ message: "Server go oopsie :(", error });
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const persistedUser = localStorage.getItem("user");
    if (persistedUser) {
      setLoggedInUser(JSON.parse(persistedUser));
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const authContextValue = {
    loggedInUser,
    loginMessage,
    isUserLoggedIn,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

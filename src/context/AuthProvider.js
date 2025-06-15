import React from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import useAuthStore from "../store/useAuthStore";

const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const contextValue = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

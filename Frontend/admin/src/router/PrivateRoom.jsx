import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore";

const PrivateRoute = ({ children }) => {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;

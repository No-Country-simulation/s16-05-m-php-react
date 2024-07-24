// Router.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Tables from "@/pages/Tables";
import PrivateRoute from "./PrivateRoom";
import useAuthStore from "@/stores/useAuthStore";
import NotFoundPage from "@/pages/NotFound";

const Router = () => {
  const { token } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/tables" /> : <Login />} />
      <Route
        path="/tables"
        element={
          <PrivateRoute>
            <Tables />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;

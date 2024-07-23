import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Tables from "@/pages/Tables";
import PrivateRoute from "./PrivateRoom";
import useAuthStore from "@/stores/useAuthStore";
import TablesUser from "@/pages/TablesUser";
import Intro from "@/pages/Intro";

const Router = () => {
  const { token } = useAuthStore();

  return (
    <Routes>
      <Route
        path="/admin"
        element={token ? <Navigate to="/tables" /> : <Login />}
      />
      <Route
        path="/tables"
        element={
          <PrivateRoute>
            <Tables />
          </PrivateRoute>
        }
      />
      <Route path="/reserve" element={<TablesUser />} />
      <Route path="/" element={<Intro />} />
    </Routes>
  );
};

export default Router;

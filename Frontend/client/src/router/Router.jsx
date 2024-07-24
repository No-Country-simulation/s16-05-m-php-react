import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Tables from "@/pages/Tables";
import Menu from "@/pages/Menu";
import Products from "@/pages/Products";
import PrivateRoute from "./PrivateRoom";
import useAuthStore from "@/stores/useAuthStore";
import TablesUser from "@/pages/TablesUser";
import Intro from "@/pages/Intro";
import NotFoundPage from "@/pages/NotFound";

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
      <Route
        path="/menu"
        element={
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route path="/reserve" element={<TablesUser />} />
      <Route path="/" element={token ? <Navigate to="/tables" /> : <Intro />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;

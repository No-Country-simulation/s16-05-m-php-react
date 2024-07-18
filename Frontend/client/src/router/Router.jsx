import Login from "@/pages/Login";
import Tables from "@/pages/Tables";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/tables" element={<Tables />} />
    </Routes>
  );
};

export default Router;

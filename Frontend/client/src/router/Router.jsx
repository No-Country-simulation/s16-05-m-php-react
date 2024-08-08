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
import Reservations from "@/pages/Reservations";
import ConfirmReservation from "@/pages/ConfirmReservation";
import SelectOption from "@/pages/SelectOption";
import Reserve from "@/pages/Reserve";
import NotFoundPage from "@/pages/NotFound";
import CategoryClient from "@/pages/CategoryClient";
import ProductClient from "@/pages/ProductClient";
import ReservationsAdmin from "@/pages/Reservations.Admin";
import SearchReservation from "@/pages/SearchReservation";
import CodeReservationConfirm from "@/pages/CodeReservationConfirm";
import Success from "@/components/modal/Success";

const Router = () => {
  const { token } = useAuthStore();

  return (
    <Routes>
      <Route
        path="/admin"
        element={(token) ? <Navigate to="/tables" /> : <Login />}
      />
      <Route
        path="/tables"
        element={
          <PrivateRoute>
            <Tables />
          </PrivateRoute>
        }
      />
      <Route path="/reserve" element={<Reserve />} />
      <Route path="/" element={<Intro />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/confirm" element={<ConfirmReservation />} />
      <Route path="/select" element={<SelectOption />} />
      <Route path="/table" element={<TablesUser />} />
      <Route path="/confirm" element={<ConfirmReservation />} />
      <Route path="/category" element={<CategoryClient />} />
      <Route path="/productsClient/:categoryId" element={<ProductClient />} />
      <Route path="/search" element={<SearchReservation />} />
      <Route
        path="/codeConfirmReservation/:id/:request"
        element={<CodeReservationConfirm />}
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
        path="/products/:categoryId"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route
        path="/reservationsAdmin"
        element={
          <PrivateRoute>
            <ReservationsAdmin />
          </PrivateRoute>
        }
      />
      <Route path="/" element={(token) ? <Navigate to="/tables" /> : <Intro />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;

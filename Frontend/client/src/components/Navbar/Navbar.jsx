import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import useAuthStore from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, email, role } = useAuthStore((state) => ({
    logout: state.logout,
    email: state.email,
    role: state.role,
  }));
  const [isOpenUser, setIsOpenUser] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const handleUserInfo = () => {};

  return (
    <div className="flex flex-row justify-between items-center p-10 h-28 font-title border-b-[2px] border-color-secondary text-color-secondary">
      <img src={logo} alt="logo" className="w-24 h-20" />

      <div className="flex gap-12 items-center font-bold justify-center">
        <a href="/tables"> Agregar Mesa</a>
        <a href="#">Agregar Menú</a>
        <FaRegUserCircle
          className="text-color-secondary text-3xl cursor-pointer"
          onClick={() => setIsOpenUser(!isOpenUser)}
        />
        {isOpenUser && (
          <div className="absolute top-[68px] right-24 mt-2 w-56 bg-color-text text-black p-2 rounded text-center shadow-md cursor-pointer">
            <p className="font-bold"> ¡Bienvenido!</p>
            <p>Usuario: {email}</p>
          </div>
        )}

        <div className="relative flex flex-col items-center">
          <MdLogout
            className="text-color-secondary text-3xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && (
            <div
              onClick={handleLogout}
              className="absolute top-[32px] right-0 mt-1 w-40 bg-color-primary text-black p-2 rounded text-center shadow-md cursor-pointer"
            >
              Cerrar sesión
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import useAuthStore from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, email, role, token } = useAuthStore((state) => ({
    logout: state.logout,
    email: state.email,
    role: state.role,
    token: state.token,
  }));

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center p-5 md:p-10 h-28 font-title border-b-[2px] border-color-secondary text-color-secondary relative">
        <img src={logo} alt="logo" className="w-24 h-20" />

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-color-secondary text-3xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="hidden md:flex gap-12 items-center font-bold justify-center">
          {token ? (
            <>
              <a href="/tables">Mesas</a>
              <a href="/menu">Menú</a>
              <a href="/reservationsAdmin">Reservas</a>
              <FaRegUserCircle
                className="text-color-secondary text-3xl cursor-pointer"
                onClick={() => setIsOpenUser(!isOpenUser)}
              />
              {isOpenUser && (
                <div className="absolute top-[68px] right-24 mt-2 w-56 bg-color-text text-black p-2 rounded text-center shadow-md cursor-pointer">
                  <p className="font-bold">¡Bienvenido!</p>
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
                    className="absolute top-[32px] right-0 mt-1 w-40 bg-color-primary text-white p-2 rounded text-center shadow-md cursor-pointer"
                  >
                    Cerrar sesión
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <a href="/reserve" className="font-bold">
                Reservar Mesa
              </a>
              <a href="/reservations" className="font-bold">
                Consultar Reserva
              </a>
              <a href="#" className="font-bold">
                Consultar Menú
              </a>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-28 left-0 right-0 flex flex-col gap-4 items-center bg-color-primary text-white p-4 z-50">
          {token ? (
            <>
              <a href="/tables" className="font-bold">
                Mesas
              </a>
              <a href="/menu" className="font-bold">
                Menú
              </a>
              <a href="/reservationsAdmin" className="font-bold">
                Reservas
              </a>
              <FaRegUserCircle
                className="text-color-secondary text-3xl cursor-pointer"
                onClick={() => setIsOpenUser(!isOpenUser)}
              />
              {isOpenUser && (
                <div className="absolute top-[68px] right-24 mt-2 w-56 bg-color-text text-black p-2 rounded text-center shadow-md cursor-pointer">
                  <p className="font-bold">¡Bienvenido!</p>
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
            </>
          ) : (
            <>
              <a href="/reserve" className="font-bold">
                Reservar Mesa
              </a>
              <a href="#" className="font-bold">
                Consultar Reserva
              </a>
              <a href="#" className="font-bold">
                Consultar Menú
              </a>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;

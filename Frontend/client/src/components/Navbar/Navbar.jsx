import React from "react";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between items-center p-5 h-28 font-title border-b-[1px] text-color-text">
      <img src={logo} alt="logo" className="w-20 h-14" />

      <ul className="flex gap-5">
        <li>Reservá tu mesa</li>
        <li>Consultá tu reserva</li>
        <li>Contactanos</li>
      </ul>
    </div>
  );
};

export default Navbar;

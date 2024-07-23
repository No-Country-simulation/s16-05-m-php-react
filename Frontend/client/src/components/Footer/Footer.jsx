import React from "react";
import logo from "../../assets/logog.svg";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const handleContactButtonClick = () => {
    window.open(`https://wa.me/${+542616002891}`, "_blank");
  };

  return (
    <div className="flex items-center justify-between p-5 gap-5 h-28 border-t-[2px] border-color-secondary font-title text-color-secondary">
      <div>
        <img src={logo} alt="logo" className="w-30 h-24" />
      </div>
      <div className="flex flex-col gap-1 font-bold">
        <a href="#"> Soporte</a>
        <a href="#"> Políticas de privacidad</a>
        <a href="#"> © 2024 Copyright ReservApp</a>
      </div>
      <div className="flex gap-5 items-center">
        <FaInstagram className="text-color-secondary text-3xl cursor-pointer" />
        <FaWhatsapp
          onClick={handleContactButtonClick}
          className="text-color-secondary text-3xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Footer;

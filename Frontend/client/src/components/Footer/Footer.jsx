import React from "react";
import logo from "../../assets/logog.svg";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const handleContactButtonClick = () => {
    window.open(`https://wa.me/${+542616002891}`, "_blank");
  };

  return (
    <div className="flex items-center justify-between p-5 border-t-[2px] border-color-secondary font-title text-color-secondary w-full mt-10">
      <div>
        <img src={logo} alt="logo" className="w-1/6" />
      </div>
      <div className="flex justify-around font-bold w-1/2">
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

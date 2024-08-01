import React from "react";
import bg_mobile from "/bg_mobile.png";
import tick from "../../assets/tick.png";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import backgroundImage from "../../assets/backgroundImage.png";

const Success = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed flex-col top-16 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-between items-center z-10">
      <div
        className="bg-color-bg p-3 rounded-md relative border-2 border-color-secondary w-[70%] min-h-[580px]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end items-end" onClick={onClose}>
          <img src={icon} alt="X" className="w-6" />
        </div>
        <div className="flex justify-center items-center flex-col p-2 gap-10">
          <h1 className="text-2xl text-center">¡Reserva exitosa!</h1>
          <img src={tick} alt="success" className="w-96" />
          <h2 className="font-title text-center text-l">
            Nota: Recuerda que el tiempo de tu reserva es de 1 Hora/s
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Success;

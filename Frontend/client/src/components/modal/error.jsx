import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "/bg_mobile.png";
import error_icon from "/error_icon.png";

const Error = ({ message, redirecTo, close }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  console.log(message);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="w-[100%] h-[auto] max-w-[600px] mx-[auto] inset-0 flex-col justify-start items-center absolute bg-[#272727] z-50"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: showModal === true ? "flex" : "none",
      }}
    >
      <button
        className="bg-[transparent] self-end mt-[5%] mr-[5%]"
        onClick={
          close === true || redirecTo === undefined
            ? closeModal
            : () => navigate(redirecTo)
        }
      >
        <svg
          width="55"
          height="51"
          viewBox="0 0 55 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.6668 40.375L11.4585 37.4L24.2918 25.5L11.4585 13.6L14.6668 10.625L27.5002 22.525L40.3335 10.625L43.5418 13.6L30.7085 25.5L43.5418 37.4L40.3335 40.375L27.5002 28.475L14.6668 40.375Z"
            fill="white"
          />
        </svg>
      </button>

      <div className="flex flex-col gap-[20px] mt-[30%] items-center">
        <p className="text-[36px] font-[700]">Ups!</p>

        <p className="text-[36px] font-[700] max-w-[250px] mx-[auto] text-center">
          {message}
        </p>

        <img
          src={error_icon}
          alt="Icono de error"
          className="w-[50%] mx-[auto]"
        />
      </div>
    </div>
  );
};

export default Error;

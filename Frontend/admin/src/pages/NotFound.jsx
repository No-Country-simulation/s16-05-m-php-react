// NotFoundPage.jsx
import React from "react";
import backgroundImage from "../assets/backgroundImage.png";
import NotFound from "../assets/404.png";
import Button1 from "@/components/ui/button1";

const NotFoundPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-[100vh] bg-color-bg text-color-text"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img src={NotFound} alt="Error 404 Not Found" className="w-1/6" />
      <div className="w-full flex justify-center text-center">
        <p className="w-1/2 my-10 font-bold text-color-secondary italic text-xl ">¡Vaya! Parece que hemos tomado un desvío inesperado en nuestra búsqueda de opciones. Parece que no tienes acceso a esta área del restaurante digital. Pero no te preocupes, incluso los navegantes virtuales como nosotros a veces nos extraviamos en el vasto mundo de los bits y bytes.</p>
      </div>
      <Button1 text="Volver al inicio" onClick={() => window.location.href = "/"} />
    </div>
  );
};

export default NotFoundPage;

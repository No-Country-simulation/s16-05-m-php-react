import { useState } from "react";
import { Button } from "@/components/ui/button";
import deco1 from "/deco1.png";
import deco2 from "/deco2.png";
import logo from "/logo.png";
import bg_mobile from "/bg_mobile.png";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const minCards = 1;
  const maxCards = 3;
  const navigate = useNavigate();
  const [cardPosition, setCardPosition] = useState(1);

  const nextCard = () => {
    if (cardPosition === maxCards) {
      navigate("/select");
    }
    if (cardPosition >= minCards && cardPosition < maxCards) {
      setCardPosition(cardPosition + 1);
    }
  };

  const prevCard = () => {
    if (cardPosition > minCards) {
      setCardPosition(cardPosition - 1);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/select");
  };

  return (
    <div className="w-[100%] h-[100%] bg-[#272727]">
      <div className="flex min-h-[100dvh] h-[auto] flex-col justify-between max-w-[600px] mx-[auto] my-[0px] bg-[#272727]">
        <div
          className={
            cardPosition === 1
              ? "flex flex-col justify-center min-h-[100dvh] h-[auto]"
              : "hidden"
          }
          style={{
            backgroundImage: `url(${bg_mobile})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img src={logo} alt="logo de ReservApp" />
          <Button
            className="bg-color-primary font-title  hover:bg-color-primary w-[200px] mx-[auto] mt-[10%] mb-[15%]"
            onClick={nextCard}
          >
            Continuar
          </Button>
        </div>

        <div className={cardPosition === 2 ? "block" : "hidden"}>
          <img
            src={deco1}
            className="w-[100%] mt-[10%]"
            alt="Imagen decorativa"
          />

          <div className="w-[100%] min-h-[20vh] mt-[20px]">
            <div className="flex flex-col">
              <h4 className="px-[2.5%] text-center text-[30px] font-[400] text-white">
                ¡Hace tu reserva!
              </h4>
              <p className="px-[2.5%] text-[20px] text-white">
                No te quedes sin lugar, reserva tu mesa desde cualquier parte,
                tenemos fechas y horarios disponibles.
              </p>
            </div>
          </div>
        </div>

        <div className={cardPosition === 3 ? "block" : "hidden"}>
          <img
            src={deco2}
            className="w-[100%] mt-[10%]"
            alt="Imagen decorativa"
          />

          <div className="w-[100%] min-h-[20vh] mt-[20px]">
            <div className="flex flex-col">
              <h4 className="px-[2.5%] text-center text-[30px] font-[400] text-white">
                Consultá nuestro menú
              </h4>
              <p className="px-[2.5%] text-[20px] text-white">
                Consultá nuestro menú y descubre una variedad exquisita de
                platos cuidadosamente preparados para satisfacer todos los
                gustos.
              </p>
            </div>
          </div>
        </div>

        <div
          className={
            cardPosition >= 2
              ? "flex justify-between w-[95%] mx-[auto] mb-[10%]"
              : "hidden"
          }
        >
          <button
            className="background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 capitalize text-white"
            type="button"
            onClick={handleClick}
          >
            Saltar
          </button>

          <div className="flex justify-between gap-[10px]">
            <button
              type="button"
              className="rounded bg-[#181818] px-[10px] py-[5px]"
              onClick={prevCard}
            >
              <svg
                width="14"
                height="24"
                viewBox="0 0 24 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 32L3 15.6L22.0909 2"
                  stroke="white"
                  strokeWidth="3"
                />
              </svg>
            </button>

            <button
              type="button"
              className="rounded bg-[#181818] px-[10px] py-[5px]"
              onClick={nextCard}
            >
              <svg
                width="14"
                height="24"
                viewBox="0 0 24 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 2L21 18.4L1.90909 32"
                  stroke="white"
                  strokeWidth="3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;

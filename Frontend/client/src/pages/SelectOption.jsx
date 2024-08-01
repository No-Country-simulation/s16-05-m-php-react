import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRestaurantName } from "@/axios/fetch";
import Table from "/table.png";
import RestLogo from "/restlogo.png";
import Menu from "/menu.png";
import Mesa from "/mesa.png";
import pet from "../../public/pets.png";

const SelectOption = () => {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    const fetchRestaurantName = async () => {
      try {
        const name = await getRestaurantName();
        setRestaurantName(name);
      } catch (error) {
        console.error("Error fetching restaurant name:", error);
      }
    };

    fetchRestaurantName();
  }, []);

  return (
    <div className="w-[100%] h-[100%] bg-[#272727]">
      <div className="flex h-[100dvh] flex-col justify-start max-w-[600px] mx-[auto] my-[0px] bg-[#272727] gap-[7%] w-[95%]">
        <h4 className="font-[600] text-[30px] mt-[20px]">
          Seleccione una opción
        </h4>
        <div className="flex flex-col gap-[25px] w-[100%] mx-[auto]">
          <h5 className="font-[250]">Seleccione el restaurante</h5>
          <div className="w-[100%] flex justify-around min-w-48 items-center bg-[#7C7676] rounded-2xl p-1">
            <img
              src={RestLogo}
              alt="Logo de un restaurante"
              className="w-[70px] h-[70px]"
            />
            <p className="text-white"> {restaurantName} Restaurant</p>
            <img src={pet} alt="Se admiten mascotas" className="w-8 h-8" />
          </div>
        </div>
        <div className="flex flex-col gap-[25px] w-[100%] mx-[auto]">
          <h5 className="font-[250]">Seleccione una opción</h5>
          <button
            className="w-[100%] flex justify-start items-center bg-[#7C7676] rounded-[20px] p-[5px] gap-[25px]"
            onClick={() => navigate("/category")}
          >
            <img
              src={Menu}
              className="w-[60px] h-[70px]"
              alt="Imagen ilustrativa de un menú"
            />
            <p className="text-[white]">Ver menú de comidas</p>
          </button>
          <div className="w-[100%] flex justify-start items-center bg-[#7C7676] rounded-[20px] p-[5px] gap-[25px]">
            <img
              src={Table}
              className="w-[60px] h-[70px]"
              alt="Imagen ilustrativa de una mesa"
            />
            <a className="text-[white]" href="/reserve">
              Reservar una mesa
            </a>
          </div>
          <button
            className="w-[100%] flex justify-start items-center bg-[#7C7676] rounded-[20px] p-[5px] gap-[25px]"
            onClick={() => navigate("/search")}
          >
            <img
              src={Mesa}
              className="w-12 h-12 my-2 ml-2"
              alt="Imagen ilustrativa de un mesa"
            />
            <p className="text-white">Consultar una Reserva</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectOption;

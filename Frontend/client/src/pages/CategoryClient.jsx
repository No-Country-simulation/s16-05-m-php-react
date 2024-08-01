import React, { useState, useEffect } from "react";
import CarouselComponent from "@/components/ui/carousel";
import useCategoryStore from "@/stores/useCategoryStore";
import { getRestaurantName } from "@/axios/fetch";
import RestLogo from "/restlogo.png";
import ImageMenu from "../../public/deco2.png";
import pet from "../../public/pets.png";
import Button1 from "@/components/ui/button1";

const CategoryClient = () => {
  const { category, error, loading, fetchCategory } = useCategoryStore();
  const [restaurantName, setRestaurantName] = useState("");

  const handleClick = () => {
    window.location.href = "/select";
  };

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
    fetchCategory();
  }, [fetchCategory]);

  if (loading) {
    return (
      <div className="flex flex-wrap w-full h-[100vh] justify-center items-center bg-color-bg ">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center text-center items-center w-full bg-color-bg h-[100vh]">
        {error}
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex justify-center w-full h-[75.5vh] bg-color-bg">
        No se encontraron datos de las categorías.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <img
          src={ImageMenu}
          alt="imagen de platillos"
          className="max-w-[300px] min-w-[160px]"
        />
      </div>
      <div className="flex justify-center w-full mb-5 -mt-15">
        <div className=" w-4/5 flex justify-around max-w-80 min-w-48 items-center bg-[#7C7676] rounded-2xl p-1">
          <img
            src={RestLogo}
            alt="Logo de un restaurante"
            className="w-16 h-16"
          />
          <p className="text-white text-center text-wrap">
            {" "}
            {restaurantName} Restaurant
          </p>
          <img src={pet} alt="Se admiten mascotas" className="w-8 h-8" />
        </div>
      </div>
      <div className="flex justify-center w-full text-center font-bold text-2xl">
        Menú
      </div>
      <div className="flex justify-center w-full mb-5">
        <CarouselComponent data={category} solicitud={"category"} />
      </div>

      <div className="flex justify-center w-full my-5">
        <Button1 text={"Volver a inicio"} onClick={handleClick} />
      </div>
    </div>
  );
};

export default CategoryClient;

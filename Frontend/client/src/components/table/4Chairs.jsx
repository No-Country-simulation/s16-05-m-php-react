import React from "react";

const TableFourChairs = ({
  name,
  id,
  reservedChairs,
  hover,
  onClick,
  isMobile,
}) => {
  const style = hover ? "cursor-pointer hover:scale-110" : "";

  const defaultChairsColor = "bg-green-500"; // Verde si está disponible
  const reservedChairsColor = "bg-red-500"; // Rojo si está reservada

  const containerClass = isMobile
    ? "w-[125px] h-[110px] m-3"
    : "w-[250px] h-[220px] m-10";
  const chairClass = isMobile ? "w-[37px] h-[37px]" : "w-[74px] h-[74px]";
  const tableClass = isMobile
    ? "w-[120px] h-[70px] top-[-93px]"
    : "w-[240px] h-[140px] top-[-185px]";

  return (
    <div id={id} className={`${containerClass}`}>
      <div className="h-full flex flex-col justify-between">
        <div className="flex justify-around">
          <div
            className={`relative ${chairClass} rounded-full ${
              reservedChairs === 4 ? reservedChairsColor : defaultChairsColor
            }`}
          ></div>
          <div
            className={`relative ${chairClass} rounded-full ${
              reservedChairs === 3 || reservedChairs === 4
                ? reservedChairsColor
                : defaultChairsColor
            }`}
          ></div>
        </div>
        <div className="flex justify-around">
          <div
            className={`relative ${chairClass} rounded-full ${
              reservedChairs === 3 || reservedChairs === 4
                ? reservedChairsColor
                : defaultChairsColor
            }`}
          ></div>
          <div
            className={`relative ${chairClass} rounded-full ${
              reservedChairs === 3 || reservedChairs === 4
                ? reservedChairsColor
                : defaultChairsColor
            }`}
          ></div>
        </div>
      </div>
      <div
        className={`${style} bg-[#C0C0C030] ${tableClass} border-solid rounded-xl relative backdrop-blur border-4 border-[#343333]`}
        onClick={onClick}
      >
        <div className="w-full h-full flex justify-center items-center">
          <span className="text-xl font-title font-bold text-color-secondary text-center">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableFourChairs;

import React from "react";

const TableTwoChairs = ({
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
    ? "w-[90px] h-[90px] m-3"
    : "w-[180px] h-[180px] m-10";
  const chairClass = isMobile ? "w-[37px] h-[37px]" : "w-[74px] h-[74px]";
  const tableClass = isMobile
    ? "w-[65px] text-l h-[65px] top-[-77px] left-[12px]"
    : "w-[130px] text-xl h-[130px] top-[-155px] left-[25px]";

  return (
    <div id={id} className={` ${containerClass}`}>
      <div className="h-full flex flex-col justify-around">
        <div className="flex justify-start">
          <div
            className={`relative ${chairClass} rounded-full ${
              reservedChairs === 1 || reservedChairs === 2
                ? reservedChairsColor
                : defaultChairsColor
            }`}
          ></div>
        </div>
        <div className="flex justify-end">
          <div
            className={`relative ${chairClass} rounded-full ${
              reservedChairs === 2 ? reservedChairsColor : defaultChairsColor
            }`}
          ></div>
        </div>
      </div>
      <div
        className={`${style} bg-[#C0C0C030] ${tableClass} rotate-45 border-solid rounded-xl relative backdrop-blur border-4 border-[#343333]`}
        onClick={onClick}
      >
        <div className="w-full h-full flex justify-center items-center -rotate-45">
          <span className=" font-title text-color-secondary font-bold text-center">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TableTwoChairs;

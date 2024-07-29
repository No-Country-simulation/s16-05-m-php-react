import React from "react";

const TableSixChairs = ({
  name,
  id,
  reservedChairs,
  hover,
  onClick,
  isMobile,
  isAvailable,
  selected,
  onSelect,
}) => {
  const defaultChairsColor = "bg-[#58575776]"; // gris si está disponible
  const reservedChairsColor = "bg-red-500"; // Rojo si está reservada

  const containerClass = isMobile
    ? "w-[110px] h-[140px] m-3"
    : "w-[220px] h-[280px] m-10";
  const chairClass = isMobile ? "w-[35px] h-[35px]" : "w-[70px] h-[70px]";
  const tableClass = isMobile
    ? "w-[78.5px] h-[140px] top-[-140px] left-[15.75px]"
    : "w-[157px] h-[280px] top-[-280px] left-[31.5px]";

  return (
    <div id={id} className={` ${containerClass}`}>
      <div className="h-full flex justify-between">
        <div className="flex flex-col justify-around">
          <div
            className={`relative rounded-full ${chairClass} ${
              reservedChairs === 6 ? reservedChairsColor : defaultChairsColor
            }`}
          ></div>
          <div
            className={`relative rounded-full ${chairClass} ${
              reservedChairs === 5 || reservedChairs === 6
                ? reservedChairsColor
                : defaultChairsColor
            }`}
          ></div>
          <div
            className={`relative rounded-full ${chairClass} ${
              reservedChairs === 5 || reservedChairs === 6
                ? reservedChairsColor
                : defaultChairsColor
            }`}
          ></div>
        </div>
        <div className="flex flex-col justify-around">
          <div
            className={`relative rounded-full ${chairClass} ${
              reservedChairs === 5 || reservedChairs === 6
                ? reservedChairsColor
                : defaultChairsColor
            }`}
          ></div>
          <div
            className={`relative rounded-full ${chairClass} ${
              reservedChairs === 5 || reservedChairs === 6
                ? reservedChairsColor
                : defaultChairsColor
            }`}
          ></div>
          <div
            className={`relative rounded-full ${chairClass} ${
              reservedChairs === 5 || reservedChairs === 6
                ? reservedChairsColor
                : defaultChairsColor
            }`}
          ></div>
        </div>
      </div>
      <div
        className={`${
          selected
            ? "scale-110 bg-color-primary"
            : hover
            ? "hover:scale-110"
            : ""
        } cursor-pointer bg-[#C0C0C030] border-solid rounded-xl relative backdrop-blur border-4 border-[#343333] ${tableClass}`}
        onClick={() => onSelect(id, name)}
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

export default TableSixChairs;

import Table from "/table.png";
import RestLogo from "/restlogo.png";
import Menu from "/menu.png";

const SelectOption = () => {
  return (
    <div className="w-[100%] h-[100%] bg-[#272727]">
      <div className="flex h-[100dvh] flex-col justify-start max-w-[600px] mx-[auto] my-[0px] bg-[#272727] gap-[7%] w-[95%] mx-[auto]">
        <h4 className="font-[600] text-[30px] mt-[20px]">
          Seleccione una opción
        </h4>
        <div className="flex flex-col gap-[25px] w-[100%] mx-[auto]">
          <h5 className="font-[250]">Seleccione el restaurante</h5>
          <div className="w-[100%] flex justify-start items-center bg-[#7C7676] rounded-[20px] p-[5px] gap-[25px]">
            <img
              src={RestLogo}
              alt="Logo de un restaurante"
              className="w-[70px] h-[70px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[25px] w-[100%] mx-[auto]">
          <h5 className="font-[250]">Seleccione una opción</h5>
          <div className="w-[100%] flex justify-start items-center bg-[#7C7676] rounded-[20px] p-[5px] gap-[25px]">
            <img
              src={Menu}
              className="w-[60px] h-[70px]"
              alt="Imagen ilustrativa de un menú"
            />
            <p className="text-[white]">Ver menú de comidas</p>
          </div>
          <div className="w-[100%] flex justify-start items-center bg-[#7C7676] rounded-[20px] p-[5px] gap-[25px]">
            <img
              src={Table}
              className="w-[70px] h-[60px]"
              alt="Imagen ilustrativa de una mesa"
            />
            <p className="text-[white]">Reservar una mesa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectOption;

import { Button } from "@/components/ui/button";
// import TableFourChairs from "@/components/table/4Chairs";
// import TableTwoChairs from "@/components/table/2Chairs";
import TableSixChairs from "@/components/table/6Chairs";

const ConfirmReservation = () => {
  return (
    <div className="bg-[#272727] w-[100%] h-[100%] flex flex-col justify-between max-w-[600px] mx-[auto]">
      <h4 className="my-[80px] mx-[auto] max-w-[200px] text-center font-[700] text-[32px]">
        Confirmación de reserva
      </h4>

      <div className="">
        <div className="flex border-t py-[10px]">
          <p className="w-[50%] ml-[5%]">Restaurante</p>
          <span>nombre resto</span>
        </div>

        <div className="flex border-t py-[10px]">
          <p className="w-[50%] ml-[5%]">Fecha</p>
          <span>dd/mm/aaaa</span>
        </div>

        <div className="flex border-t border-b py-[10px]">
          <p className="w-[50%] ml-[5%]">Hora</p>
          <span>hh a hh</span>
        </div>
      </div>

      <div className="mx-[auto]">
        <TableSixChairs />
        {/* <TableFourChairs /> */}
        {/* <TableTwoChairs /> */}
      </div>

      <div className="flex justify-center gap-[20px] w-[100%]">
        <Button className="bg-color-secondary w-[40%] font-title hover:bg-color-secondary px-[20px] py-[10px] text-[#000] border border-[#900B09]">
          CANCELAR
        </Button>

        <Button
          className="bg-color-primary w-[40%] font-title hover:bg-color-primary px-[20px] py-[10px] border border-[#900B09]"
          type="submit"
        >
          RESERVAR
        </Button>
      </div>
    </div>
  );
};

export default ConfirmReservation;

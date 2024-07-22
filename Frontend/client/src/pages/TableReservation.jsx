import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const handleSubmit = (e) => {
  e.preventDefault();
};

const TableReservation = () => {
  return (
    <div className="max-w-[600px] w-[95%] mx-[auto] bg-[#272727]">
      <form
        className="bg-[#272727] w-[100%] flex flex-col gap-[10px]"
        onSubmit={handleSubmit}
      >
        <h4 className="text-center font-[750] text-[32px] mt-[20px]">Mesa 1</h4>

        <label className="font-[500] text-[24px]" htmlFor="nombre">
          Nombre
        </label>
        <Input
          className="bg-[transparent] border border-[#DCBC4B] mb-[20px] max-h-[45px]"
          type="text"
          id="nombre"
        />

        <label className="font-[500] text-[24px]" htmlFor="apellido">
          Apellido
        </label>
        <Input
          className="bg-[transparent] border border-[#DCBC4B] mb-[20px] max-h-[45px]"
          type="text"
          id="apellido"
        />

        <label className="font-[500] text-[24px]" htmlFor="celular">
          Celular
        </label>
        <Input
          className="bg-[transparent] border border-[#DCBC4B] mb-[20px] max-h-[45px]"
          type="tel"
          id="celular"
        />

        <label className="font-[500] text-[24px]" htmlFor="email">
          Email
        </label>
        <Input
          className="bg-[transparent] border border-[#DCBC4B] mb-[20px] max-h-[45px]"
          type="email"
          id="email"
        />

        <div className="flex justify-between w-[100%] mt-[60px]">
          <Button className="bg-color-secondary w-[45%] font-title hover:bg-color-secondary px-[20px] py-[10px] text-[#000] border border-[#900B09]">
            CANCELAR
          </Button>

          <Button
            className="bg-color-primary w-[45%] font-title hover:bg-color-primary px-[20px] py-[10px] border border-[#900B09]"
            type="submit"
          >
            RESERVAR
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TableReservation;

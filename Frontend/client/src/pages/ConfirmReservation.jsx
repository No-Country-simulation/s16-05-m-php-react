import { Button } from "@/components/ui/button";
import TableTwoChairs from "@/components/table/2Chairs";
import TableFourChairs from "@/components/table/4Chairs";
import TableSixChairs from "@/components/table/6Chairs";
import useReserveStore from "@/stores/useReserveStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReservation } from "@/axios/fetch";
import Error from "@/components/modal/error";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  const formattedDay = String(date.getDate()).padStart(2, "0");
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const formattedYear = date.getFullYear();
  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

const ConfirmReservation = () => {
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState(0);
  const { date, time, table, number_of_people } = useReserveStore((state) => ({
    date: state.date,
    time: state.time,
    table: state.table,
    number_of_people: state.number_of_people,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      date,
      time,
      owner_first_name,
      owner_last_name,
      owner_phone_number,
      owner_email,
      table,
    } = useReserveStore.getState();

    console.log(
      date,
      time,
      owner_first_name,
      owner_last_name,
      owner_phone_number,
      owner_email,
      table["@id"]
    );

    createReservation(
      date,
      time,
      owner_first_name,
      owner_last_name,
      owner_phone_number,
      owner_email,
      table["@id"] // Enviamos solo el @id como table
    )
      .then((response) => {
        navigate("/reservations");
      })
      .catch((error) => {
        console.error("Error al crear la reserva:", error);
        setApiStatus(error.response.status);
      });
  };

  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/reservations");
  };

  const renderTable = () => {
    if (number_of_people <= 2) {
      return <TableTwoChairs name={table.name} />;
    } else if (number_of_people <= 4) {
      return <TableFourChairs name={table.name} />;
    } else {
      return <TableSixChairs name={table.name} />;
    }
  };

  return (
    <div className="bg-[#272727] w-[100%] h-[100%] flex flex-col justify-between max-w-[600px] mx-[auto] relative">
      {
        // Modal de error
        apiStatus === 422 || apiStatus === 400 || apiStatus === 404 ? (
          <Error message="No se pudo realizar la reserva" />
        ) : apiStatus === 401 || apiStatus === 405 ? (
          <Error message="Se produjo un error" />
        ) : (
          ""
        )
      }
      <h4 className="my-[80px] mx-[auto] max-w-[200px] text-center font-[700] text-[32px]">
        Confirmación de reserva
      </h4>

      <div className="">
        <div className="flex border-t py-[10px]">
          <p className="w-[50%] ml-[5%]">Restaurante</p>
          <span>Healthy Restaurant</span>
        </div>

        <div className="flex border-t py-[10px]">
          <p className="w-[50%] ml-[5%]">Fecha</p>
          <span>{formatDate(date)}</span>
        </div>

        <div className="flex border-t border-b py-[10px]">
          <p className="w-[50%] ml-[5%]">Hora</p>
          <span>{time}</span>
        </div>
      </div>

      <div className="mx-[auto]">{renderTable()}</div>

      <div className="flex justify-center gap-[20px] w-[100%] mb-[20px]">
        <Button
          className="bg-color-secondary w-[40%] font-title hover:bg-color-secondary px-[20px] py-[10px] text-[#000] border border-[#900B09]"
          onClick={handleReturn}
        >
          CANCELAR
        </Button>

        <Button
          className="bg-color-primary w-[40%] font-title hover:bg-color-primary px-[20px] py-[10px] border border-[#900B09]"
          onClick={handleSubmit}
        >
          RESERVAR
        </Button>
      </div>
    </div>
  );
};

export default ConfirmReservation;

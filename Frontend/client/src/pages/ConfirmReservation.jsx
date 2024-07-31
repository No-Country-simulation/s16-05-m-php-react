import { Button } from "@/components/ui/button";
import TableTwoChairs from "@/components/table/2Chairs";
import TableFourChairs from "@/components/table/4Chairs";
import TableSixChairs from "@/components/table/6Chairs";
import useReserveStore from "@/stores/useReserveStore";
import { useNavigate } from "react-router-dom";
import { createReservation } from "@/axios/fetch";
import { useState } from "react";
import Success from "@/components/modal/Success";

export const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  const formattedDay = String(date.getDate()).padStart(2, "0");
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const formattedYear = date.getFullYear();
  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
};

const ConfirmReservation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    date,
    time,
    table,
    number_of_people,
    setCode,
    attendee_count,
    setModal,
  } = useReserveStore((state) => ({
    date: state.date,
    time: state.time,
    table: state.table,
    attendee_count: state.attendee_count,
    number_of_people: state.number_of_people,
    setCode: state.setCode,
    setModal: state.setModal,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      date,
      time,
      owner_first_name,
      owner_last_name,
      owner_phone_number,
      owner_email,
      attendee_count,
      table,
      setCode,
      setModal,
    } = useReserveStore.getState();

    console.log("Tipo de attendee_count:", typeof attendee_count);
    console.log("Tipo de attendee_count:", typeof owner_phone_number);

    console.log(
      date,
      time,
      owner_first_name,
      owner_last_name,
      owner_phone_number,
      owner_email,
      table["@id"],
      attendee_count
    );

    createReservation(
      date,
      time,
      owner_first_name,
      owner_last_name,
      owner_phone_number,
      owner_email,
      table["@id"],
      attendee_count
    )
      .then((response) => {
        const { code } = response;
        setCode(code);
        setModal(true);
        navigate("/reservations");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al crear la reserva:", error);
        setLoading(false);
      });
  };
  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/reserve");
  };

  const renderTable = () => {
    if (attendee_count <= 2) {
      return (
        <TableTwoChairs name={table.name} reservedChairs={attendee_count} />
      );
    } else if (attendee_count <= 4) {
      return (
        <TableFourChairs name={table.name} reservedChairs={attendee_count} />
      );
    } else {
      return (
        <TableSixChairs name={table.name} reservedChairs={attendee_count} />
      );
    }
  };

  return (
    <div className="bg-[#272727] w-full h-full flex flex-col justify-between max-w-[600px] mx-[auto]">
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

      <div className="flex justify-center gap-[20px] w-[100%]">
        <Button
          className="bg-color-secondary w-[40%] font-title font-bold  hover:bg-color-secondary px-[20px] py-[10px] text-[#000] border border-[#900B09]"
          onClick={handleReturn}
        >
          CANCELAR
        </Button>

        <Button
          className="bg-color-primary w-[40%] font-bold font-title hover:bg-color-primary px-[20px] py-[10px] border border-[#900B09]"
          onClick={handleSubmit}
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
          ) : (
            "SELECCIONAR"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmReservation;

import deco1 from "/deco1.png";
import bg1_mobile from "/bg1_mobile.png";
import useReserveStore from "@/stores/useReserveStore";
import { formatDate } from "./ConfirmReservation";
import Success from "@/components/modal/Success";

const Reservations = () => {
  const { date, time, table, number_of_people, code, modal, owner_first_name } =
    useReserveStore((state) => ({
      date: state.date,
      time: state.time,
      table: state.table,
      number_of_people: state.number_of_people,
      code: state.code,
      owner_first_name: state.owner_first_name,
      modal: state.modal,
    }));

  return (
    <div
      className="w-[100%] h-[100%] min-h-[100dvh] bg-[#272727] max-w-[520px] mx-[auto] overflow-hidden"
      style={{
        backgroundImage: `url(${bg1_mobile})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Success />
      <img
        src={deco1}
        alt="Imagen ilustrativa"
        className="mt-[-25px] mx-[auto] scale-[1.2]"
      />

      <h5 className="text-center text-[22px]">¡Hola {owner_first_name}!</h5>

      <h4 className="text-center text-[32px] mt-[10px] mb-[30px]">
        Tus reservaciones
      </h4>

      <div className="w-[95%] mx-[auto] rounded-[5px] bg-[transparent] border border-[#7F2A44] p-[10px]">
        <div className="flex mb-[10px] items-center">
          <h5 className="ml-[auto] text-[20px]">Restaurante Healthy</h5>

          <svg
            className="ml-[auto]"
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34 5.99999C34.5253 5.47471 35.1489 5.05803 35.8352 4.77374C36.5215 4.48946 37.2571 4.34314 38 4.34314C38.7429 4.34314 39.4785 4.48946 40.1648 4.77374C40.8511 5.05803 41.4747 5.47471 42 5.99999C42.5253 6.52528 42.942 7.14889 43.2263 7.83521C43.5105 8.52153 43.6569 9.25713 43.6569 9.99999C43.6569 10.7429 43.5105 11.4785 43.2263 12.1648C42.942 12.8511 42.5253 13.4747 42 14L15 41L4 44L7 33L34 5.99999Z"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex">
          <div className="w-[35%]"></div>
          <div>
            <p>{formatDate(date)}</p>
            <p>Hora: {time}</p>
            <p>Comensales {number_of_people}</p>
            <p>Código de reserva: {code}</p>
          </div>
        </div>
      </div>

      <svg
        className="mx-[auto] mt-[10px]"
        width="32"
        height="32"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 10V38M10 24H38"
          stroke="#fff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Reservations;

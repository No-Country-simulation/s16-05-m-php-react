import React, { useState, useEffect } from "react";
import { getReservationByCode, getReservations } from "@/axios/fetch";
import Button1 from "@/components/ui/button1";
import Table from "@/components/ui/table";
import { Bold } from "lucide-react";

const ReservationsAdmin = () => {
    const [code, setCode] = useState("");
    const [date, setDate] = useState("");
    const [reservation, setReservation] = useState(null);
    const [data, setData] = useState("");
    const [bool , setBool] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (bool === false) {
            setLoading(false);
            reservasFilter(data);
        }else if(bool === true){
            setLoading(false);
            setReservation(<Table data={data} searchCode={true} />);
            setBool(null);
        }
    }, [bool]);

    useEffect(() => {
        if (loading) {
            setReservation(
                <div className="flex flex-wrap w-full h-[35vh] justify-center items-center bg-color-bg ">
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
    }, [loading]);

    const getReservationData = async () => {
        try {
            const reservationData = await getReservationByCode(code);
            if (reservationData) {
                setCode("");
                setDate("");
                setData(reservationData);
                setBool(true);
            } else {
                setReservation("No se encontró ninguna reserva con ese código.");
            }
        } catch (error) {
            console.error("Error al obtener la reserva:", error);
        }
    };

    const getReservationDate = async () => {
        try {
            const reservationData = await getReservations();
            if (reservationData) {
                setData(reservationData);
                setBool(false);
            }
        } catch (error) {
            console.error("Error al obtener la reserva:", error);
        }
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    }

    const handleDateChange = (event) => {
        setDate(event.target.value);
    }

    const handleClick = () => {
        if(code === "" && date === "") {
            alert("Por favor, ingrese el Código o la fecha de la reserva.");
            return;
        }else{
            setLoading(true);
            if(code !== ""){
                getReservationData();
            }else if(date !== ""){
                getReservationDate();
            }
        }
    }

    const reservasFilter = (items) => {
        console.log(items["data"]["hydra:member"]);
        console.log(date);
        var filteredItems = [];
        for (var i = 0; i < items["data"]["hydra:member"].length; i++) {
            if (items["data"]["hydra:member"][i]["date"] === date) {
                filteredItems.push(items["data"]["hydra:member"][i]);
            }
        }
        console.log(filteredItems);
        setCode("");
        setDate("");
        setReservation(<Table data={filteredItems} />);
        setBool(null);
    }

    return (
    <div>
        <h1 className="text-3xl text-color-secondary font-bold text-center my-5">Gestión De Reservas</h1>
        <h3 className="text-xl text-color-secondary font-bold text-center border-t-4 pt-5 border-solid border-color-secondary">Buscar una reserva</h3>
        <div className="flex flex-wrap justify-center items-center w-full">
            <input type="text" placeholder="Código" maxLength={6} onChange={handleCodeChange} value={code} className="px-6 py-3 rounded-lg m-5 w-40 bg-color-bg border-2 placeholder-color-secondary text-color-secondary font-bold border-solid border-color-primary"/>
            <input type="date" onChange={handleDateChange} value={date} className="p-2 rounded-lg m-5 w-40 bg-color-bg border-2 text-color-secondary font-bold border-solid border-color-primary"/>
        </div>
        <div className="flex flex-col justify-center items-center w-full  border-b-4 pb-5 border-solid border-color-secondary">
            <p className="text-sm italic text-white font-medium mb-2">Puede buscar por el Código o la fecha</p>
            <Button1 type="button" text="Buscar" onClick={handleClick} />
        </div>
        <div className="flex justify-center w-full min-h-40">
            {reservation}
        </div>
    </div>);
};

export default ReservationsAdmin;
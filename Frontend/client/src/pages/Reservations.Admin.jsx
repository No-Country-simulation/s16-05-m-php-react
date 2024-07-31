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


    useEffect(() => {
        if (bool === false) {
            reservasFilter(data);
        }else if(bool === true){
            setReservation(<Table data={data} searchCode={true} />);
            setBool(null);
        }
    }, [bool]);

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
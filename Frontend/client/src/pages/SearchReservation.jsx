import React, { useState, useEffect } from "react";
import { getReservationByCode } from "@/axios/fetch";
import Button1 from "@/components/ui/button1";
import CardStatus from "@/components/Cards/Status.Reservation";

const SearchReservation = () => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [reservation, setReservation] = useState(null);
    const [responseReservation, setResponseReservation] = useState(null);
    const [bool, setBool] = useState(null);

    useEffect(() => {
        if (loading) {
            setResponseReservation(
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

    useEffect(() => {
        if(bool === true){
            setResponseReservation(<tbody>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Código: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.code} </td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Estado: </td>
                    <td className="text-center px-2 py-1 border-t-1 border-r-1 border-b-1 border-color-secondary flex justify-center items-center"> <CardStatus status={reservation.status} /></td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Nombre: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.owner_first_name} </td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Apellido: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.owner_last_name} </td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Teléfono: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.owner_phone_number} </td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 text-wrap border-b-2 border-color-secondary"> Email: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.owner_email} </td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Fecha: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.date} </td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Hora: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.time} </td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Mesa: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.table.name} </td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Comensales: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.attendee_count} </td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Creada: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.created_at} </td>
                </tr>
                <tr>
                    <td className="text-center px-2 py-1 text-color-secondary border-t-2 border-l-2 border-b-2 border-color-secondary"> Actualizada: </td>
                    <td className="text-center px-2 py-1 border-t-2 border-r-2 border-b-2 border-color-secondary"> {reservation.update_at} </td>
                </tr>
                <tr>
                    <td className="py-3" colSpan={2}><Button1 text={"Cancelar la reserva"} type={"button"} /></td>
                </tr>
            </tbody>);
            setBool(null);
            setCode("");
        }else if(bool === false){
            setResponseReservation(<tbody>
                <tr>
                    <td className="text-center px-2 py-1"> No se encontró ninguna reserva </td>
                </tr>
            </tbody>);
            setCode("");
            setBool(null);
        }
    }, [bool]);
    const handleCodeChange = (event) => {
        setCode(event.target.value);
    }

    const handleClick = () => {
        if(code === "") {
            alert("Por favor, introduce un código de reserva");
            return;
        }else{
            setLoading(true);
            reserve();
        }
    }

    const handleReturn = () => {
        window.location.href = "/select";
    }

    const reserve = async() => {
        try{
            const response = await getReservationByCode(code);
            if(response){
                setLoading(false);
                setReservation(response);
                setBool(true);
            };
        }catch(error){
            setBool(false);
            setLoading(false);
        }
    };

    return(
        <div className="w-full flex flex-col justify-center items-center py-5">
            <h1 className="text-3xl text-color-secondary font-bold text-center px-2">Buscar una Reserva</h1>
            <div className="w-full flex flex-wrap justify-around items-center max-w-sm my-2 px-2">
                <input 
                    type="text" 
                    placeholder="Código" 
                    maxLength={6}
                    value={code}
                    onChange={handleCodeChange}
                    className="px-3 py-2 rounded-lg m-5 w-40 text-center placeholder-color-bg focus:outline-none focus:ring-0 focus:outline-2 focus:outline-color-secondary focus:bg-color-bg focus:placeholder-color-secondary text-color-secondary font-bold border-solid caret-color-secondary"/>
                <Button1
                    type="button"
                    text="Buscar"
                    onClick={handleClick}
                />
                <Button1
                    type="button"
                    text="Volver al inicio"
                    variant={"confirm"}
                    onClick={handleReturn}
                />
            </div>
            <div className="w-full border-t-2 flex justify-center border-color-secondary">
                <div className="w-full max-w-sm flex min-h-[50vh] justify-center items-center px-3 overflow-x-auto">
                    <table className="w-full max-w-sm text-center justify-center items-center border-2 border-color-secondary my-5 table-auto">
                        <thead className="text-color-secondary border-2 border-color-secondary">
                            <tr>
                                <th colSpan={2} className="text-center px-2 py-1"> Información de la Reserva </th>
                            </tr>
                        </thead>
                        {responseReservation}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SearchReservation;
import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/backgroundImage.png";
import Button1 from "../ui/button1";
import CardStatus from "../Cards/Status.Reservation";
import { editStatusReserve } from "../../axios/fetch";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const EditReserve = ({isOpen, onClose, data}) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [owner_first_name, setOwner_first_name] = useState("");
    const [owner_last_name, setOwner_last_name] = useState("");
    const [owner_phone_number, setOwner_phone_number] = useState("");
    const [owner_email, setOwner_email] = useState("");
    const [attendee_count, setAttendee_count] = useState("");
    const [table, setTable] = useState("");

    useEffect(() => {
        if (isOpen) {
            defaultModal();
        }
    }, [isOpen]);

    useEffect(() => {
        if (loading) {
          setResponse(
            <div className="flex flex-wrap w-full h-[35vh] justify-center items-center bg-transparent ">
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

    if (!isOpen) return null;

    const changeStatus = async (status) => {
        setLoading(true);
        try {
            const response = await editStatusReserve(data.id, status);
            if(response){
                alert("Se ha editado el estado de la reserva");
                window.location.reload();
            }
        } catch (error) {
            alert("No se pudo editar el estado de la reserva: "+error);
            setLoading(false);
        }
    }

    const handleDateChange = (event) =>{
        const valueInput = event.target.value;
        setDate(valueInput);
    }
    const handleTimeChange = (event) =>{
        const valueInput = event.target.value;
        setTime(valueInput);
    }
    const handleFirstNameChange = (event) =>{
        const valueInput = event.target.value;
        setOwner_first_name(valueInput);
    }
    const handleLastNameChange = (event) =>{
        const valueInput = event.target.value;
        setOwner_last_name(valueInput);
    }
    const handlePhoneChange = (event) =>{
        setOwner_phone_number(event);
    }
    const handleEmailChange = (event) =>{
        const valueInput = event.target.value;
        setOwner_email(valueInput);
    }
    const handleTableChange = (event) =>{
        const valueInput = event.target.value;
        setTable(valueInput);
    }
    const handleAttendeeChange = (event) =>{
        const valueInput = event.target.value;
        setAttendee_count(valueInput);
    }

    const defaultModal = () => {
        setResponse(
            <div className="flex flex-wrap justify-around items-center w-full max-w-md">
                <div className="my-3">
                    <Button1 text="Cancelar" onClick={onClose} />
                </div>
                <div className="my-3">
                    <Button1 text="Editar Estado" variant={"confirm"} onClick={EditReserveStatus}/>
                </div>
                <div className="my-3">
                    <Button1 text="Editar Datos" variant={"confirm"} onClick={EditReserve}/>
                </div>
            </div>
        );
        
    };


    const EditReserve = () => {
        setDate(data.date);
        setTime(data.time);
        setOwner_first_name(data.owner_first_name);
        setOwner_last_name(data.owner_last_name);
        setOwner_phone_number(data.owner_phone_number);
        setOwner_email(data.owner_email);
        setAttendee_count(data.attendee_count);
        setTable(data["table"]["name"]);
        setResponse(
            <div className="w-full flex flex-col justify-around h-full items-center">
                <h1 className="text-2xl text-center font-bold text-color-secondary">Nuevos datos de la reserva {data.code}</h1>
                <form className="flex flex-wrap justify-around items-center w-2/3 h-3/4">
                    <div className="flex justify-around flex-wrap w-full">
                        <label htmlFor="table" className="flex flex-col w-1/3 justify-center items-center">
                            <span className="text-color-secondary font-bold text-xl w-full text-center">Mesa</span>
                            <input type="text" className="w-full px-3 py-2 rounded-md text-white text-shadow-custom bg-white/30 border border-white focus:outline-none font-medium" value={table} onChange={handleTableChange} required />
                        </label>
                        <label htmlFor="attendee_count" className="flex flex-col w-1/3 justify-center items-center">
                            <span className="text-color-secondary font-bold text-xl w-full text-center">Comensales</span>
                            <input type="number" min={1} className="w-full px-3 py-2 rounded-md text-white text-shadow-custom bg-white/30 border border-white focus:outline-none font-medium" value={attendee_count} onChange={handleAttendeeChange} required />
                        </label>
                    </div>
                    <div className="flex justify-around flex-wrap w-full">
                        <label htmlFor="date" className="flex flex-col w-1/3 justify-center items-center">
                            <span className="text-color-secondary font-bold text-xl w-full text-center">Fecha</span>
                            <input type="date" className="w-full px-3 py-2 rounded-md text-white text-shadow-custom bg-white/30 border border-white focus:outline-none font-medium" value={date} onChange={handleDateChange} required />
                        </label>
                        <label htmlFor="time" className="flex flex-col w-1/3 justify-center items-center">
                            <span className="text-color-secondary font-bold text-xl w-full text-center">Hora</span>
                            <select className="w-full px-3 py-2 rounded-md text-white text-shadow-custom bg-white/30 border border-white focus:outline-none font-medium" value={time} onChange={handleTimeChange} required >
                                <option value="">Seleccione una hora</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex justify-around flex-wrap w-full">
                        <label htmlFor="owner_first_name" className="flex flex-col w-1/3 justify-center items-center">
                            <span className="text-color-secondary font-bold text-xl w-full text-center">Nombre</span>
                            <input type="text" className="w-full px-3 py-2 rounded-md text-white text-shadow-custom bg-white/30 border border-white focus:outline-none font-medium" value={owner_first_name} onChange={handleFirstNameChange} required />
                        </label>
                        <label htmlFor="owner_last_name" className="flex flex-col w-1/3 justify-center items-center">
                            <span className="text-color-secondary font-bold text-xl w-full text-center">Apellido</span>
                            <input type="text" className="w-full px-3 py-2 rounded-md text-white text-shadow-custom bg-white/30 border border-white focus:outline-none font-medium" value={owner_last_name} onChange={handleLastNameChange} required />
                        </label>
                    </div>
                    <div className="flex justify-around flex-wrap w-full">
                        <label htmlFor="owner_phone_number" className="flex flex-col w-1/3 justify-center items-center">
                            <span className="text-color-secondary font-bold text-xl w-full text-center">Teléfono</span>
                            <PhoneInput
                                country={'co'}
                                value={owner_phone_number}
                                onChange={handlePhoneChange}
                                enableSearch={true}
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: true
                                }}
                            />
                        </label>
                        <label htmlFor="owner_email" className="flex flex-col w-1/3 justify-center items-center">
                            <span className="text-color-secondary font-bold text-xl w-full text-center">Email</span>
                            <input type="email" className="w-full px-3 py-2 rounded-md text-white text-shadow-custom bg-white/30 border border-white focus:outline-none font-medium" value={owner_email} onChange={handleEmailChange} required />
                        </label>
                    </div>
                </form>
                <div className="flex flex-wrap justify-around items-center w-full max-w-md">
                    <div className="my-3">
                        <Button1 text="Cancelar" onClick={onClose} />
                    </div>
                    <div className="my-3">
                        <Button1 text="Regresar" variant={"confirm"} onClick={()=>defaultModal()}/>
                    </div>
                    <div className="my-3">
                        <Button1 text="Confirmar" variant={"confirm"} onClick={onClose}/>
                    </div>
                </div>
            </div>
        );
    };

    const EditReserveStatus = () => {
        setResponse(
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-2xl text-center font-bold text-color-secondary my-5">Escoge el nuevo estado de la reserva {data.code}</h1>
                <div className="flex flex-wrap justify-around items-center w-full max-w-md h-80 ">
                    <div className="flex justify-around flex-wrap">
                        {data.status !== "in-progress" ? <div className="m-5"><CardStatus status={"in-progress"} onClick={()=>changeStatus("in-progress")}/></div> : null}
                        {data.status !== "canceled" ? <div className="m-5"><CardStatus status={"canceled"} onClick={()=>changeStatus("canceled")}/></div> : null}
                        {data.status !== "completed" ? <div className="m-5"><CardStatus status={"completed"} onClick={()=>changeStatus("completed")}/></div> : null}
                        {data.status !== "pending" ? <div className="m-5"><CardStatus status={"pending"} onClick={()=>changeStatus("pending")}/></div> : null}
                        {data.status !== "no-show" ? <div className="m-5"><CardStatus status={"no-show"} onClick={()=>changeStatus("no-show")}/></div> : null}
                        {data.status !== "scheduled" ? <div className="m-5"><CardStatus status={"scheduled"} onClick={()=>changeStatus("scheduled")}/></div> : null}
                    </div>
                </div>
                <div className="flex flex-wrap justify-around items-center w-full max-w-md">
                    <div className="my-3">
                        <Button1 text="Cancelar" onClick={onClose} />
                    </div>
                    <div className="my-3">
                        <Button1 text="Regresar" variant={"confirm"} onClick={()=>defaultModal()}/>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10" onClick={onClose}>
            <div className="bg-color-bg p-10 rounded-md relative border-2 border-color-secondary w-1/2 h-3/4 min-h-[580px] flex justify-center items-center" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center"}} onClick={e => e.stopPropagation()}>
            {response}
            </div>
        </div>
    );
};

export default EditReserve;
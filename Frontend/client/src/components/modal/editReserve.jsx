import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/backgroundImage.png";
import Button1 from "../ui/button1";
import CardStatus from "../Cards/Status.Reservation";
import { editStatusReserve } from "../../axios/fetch";
import EditReservationForm from "../Cards/form.EditReservation";

const EditReserve = ({isOpen, onClose, data}) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

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
        setResponse(<EditReservationForm data={data} onClose={onClose} defaultModal={()=>defaultModal()}/>);
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
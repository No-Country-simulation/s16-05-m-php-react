import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/backgroundImage.png";
import Button1 from "../ui/button1";
import CardStatus from "../Cards/Status.Reservation";
import { editStatusReserve } from "../../axios/fetch";

const EditReserve = ({isOpen, onClose, data}) => {
    const [response, setResponse] = useState(null);
    const [cards, setCards] = useState(null);

    useEffect(() => {
        if (isOpen) {
            var cardData = [];
            if(data.status !== "in-progress"){
                cardData.push(<div className="m-5"><CardStatus status={"in-progress"} onClick={()=>changeStatus("in-progress")}/></div>)
            };
            if(data.status !== "canceled"){
                cardData.push(<div className="m-5"><CardStatus status={"canceled"} onClick={()=>changeStatus("canceled")}/></div>)
            };
            if(data.status !== "completed"){
                cardData.push(<div className="m-5"><CardStatus status={"completed"} onClick={()=>changeStatus("completed")}/></div>)
            };
            if(data.status !== "pending"){
                cardData.push(<div className="m-5"><CardStatus status={"pending"} onClick={()=>changeStatus("pending")}/></div>)
            };
            if(data.status !== "no-show"){
                cardData.push(<div className="m-5"><CardStatus status={"no-show"} onClick={()=>changeStatus("no-show")}/></div>)
            };
            if(data.status !== "scheduled"){
                cardData.push(<div className="m-5"><CardStatus status={"scheduled"} onClick={()=>changeStatus("scheduled")}/></div>)
            };
            setCards(cardData);
            defaultModal();
        }
    }, [isOpen]);
    if (!isOpen) return null;

    const changeStatus = async (status) => {
        try {
            const response = await editStatusReserve(data.id, status);
            if(response){
                alert("Se ha editado el estado de la reserva");
                window.location.reload();
            }
        } catch (error) {
            alert("No se pudo editar el estado de la reserva: "+error);
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
                    <Button1 text="Editar Datos" variant={"confirm"} />
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
                        {cards}
                    </div>
                </div>
                <div className="flex flex-wrap justify-around items-center w-full max-w-md">
                    <div className="my-3">
                        <Button1 text="Cancelar" onClick={onClose} />
                    </div>
                    <div className="my-3">
                        <Button1 text="Volver" variant={"confirm"} onClick={()=>defaultModal()}/>
                    </div>
                    <div className="my-3">
                        <Button1 text="Confirmar" variant={"confirm"} onClick={onClose}/>
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
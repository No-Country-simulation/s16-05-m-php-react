import React, { useState, useEffect } from "react";

const CardStatus = ({ status }) => {
    const [backgroundColor, setBackgroundColor] = useState("");
    const [text, setText] = useState("");
    
    useEffect(() => {
        switch (status) {
            case "in-progress":
                setBackgroundColor("bg-[#6FBEAC]");
                setText("En Curso")
                break;
            case "canceled":
                setBackgroundColor("bg-[#F82424]");
                setText("Cancelada")
                break;
            case "completed":
                setBackgroundColor("bg-[#62BD4B]");
                setText("Completada")
                break;
            case "pending":
                setBackgroundColor("bg-[#689DCF]");
                setText("Pendiente")
                break;
            case "no-show":
                setBackgroundColor("bg-[#DF9339]");
                setText("Ausente")
                break;
            case "scheduled":
                setBackgroundColor("bg-[#AA6ECF]");
                setText("Programada")
                break;
            default:
                break;
        }
    }, [status]);
    return (
        <div className={`px-4 py-2 rounded-3xl ${backgroundColor} text-center text-white cursor-default text-nowrap font-bold`}>{text}
        </div>)
}

export default CardStatus
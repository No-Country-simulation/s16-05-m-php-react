import React, { useState } from "react";
import TableFourChairs from "../components/table/4Chairs.jsx";
import TableTwoChairs from "../components/table/2Chairs.jsx";
import TableSixChairs from "../components/table/6Chairs.jsx";
import { getTables } from "../axios/fetch";


const Tables = () => {
    try {
        const response = await getTables();
        if (response.status === 200) {
            return (
                <div className="flex justify-center w-full h-[70vh] bg-[#272727]">
                    <TableFourChairs />
                    <TableTwoChairs />
                    <TableSixChairs />
                </div>
            )
        } else {
            alert(`Error al obtener los datos de la Base de Datos: ${response.status}`);
        }
    } catch (error) {
        alert("Error al obtener los datos de la Base de Datos:", error);
    }
}

export default Tables
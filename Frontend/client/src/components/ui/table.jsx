import React, {useState, useEffect} from "react";
import CardStatus from "@/components/Cards/Status.Reservation";
import Button1 from "./button1";

const Table = ({data, searchCode}) => {
    const [response, setResponse] = useState("");
    useEffect(() => {
        if(searchCode === true){
            reserva();
        }else{
            reservas();
        }
    }, [data]);

    const reserva = () => {
            setResponse(
                <tbody>
                    <tr>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5"><Button1 text="Editar" variant={"confirm"} /></td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5"><CardStatus status={data.status} /></td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{data.code}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{data.table.name}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{data.date}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{data.time}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{data.owner_first_name + " " + data.owner_last_name}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{data.owner_phone_number}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{data.owner_email}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{data.attendee_count}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{data.created_at}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{data.update_at}</td>
                    </tr>
                </tbody>
            )
        }

        const reservas = () => {
            const reserveList = data.map((item) => {
                return (<tbody key={item.id}>
                    <tr className="h-20">
                        <td className="border-2 border-solid font-medium border-color-secondary px-5"><Button1 text="Editar" variant={"confirm"} /></td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5"><CardStatus status={item.status} /></td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{item.code}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{item['table']['name']}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{item.date}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{item.time}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{item.owner_first_name + " " + item.owner_last_name}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{item.owner_phone_number}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{item.owner_email}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{item.table.attendee_count}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{item.created_at}</td>
                        <td className="border-2 border-solid font-medium border-color-secondary px-5">{item.update_at}</td>
                    </tr>
                </tbody>);
            });
            setResponse(reserveList);
        }
    
    return (<table className="my-5 text-center text-wrap">
        <thead>
            <tr>
                <th className="border-2 border-solid border-color-secondary px-5">Actualizar Estado</th>
                <th className="border-2 border-solid border-color-secondary px-5">Estado</th>
                <th className="border-2 border-solid border-color-secondary px-5">Código</th>
                <th className="border-2 border-solid border-color-secondary px-5">Mesa</th>
                <th className="border-2 border-solid border-color-secondary px-5">Fecha</th>
                <th className="border-2 border-solid border-color-secondary px-5">Hora</th>
                <th className="border-2 border-solid border-color-secondary px-5">Nombre Cliente</th>
                <th className="border-2 border-solid border-color-secondary px-5">Celular</th>
                <th className="border-2 border-solid border-color-secondary px-5">Correo Electrónico</th>
                <th className="border-2 border-solid border-color-secondary px-5">Personas</th>
                <th className="border-2 border-solid border-color-secondary px-5">Creado</th>
                <th className="border-2 border-solid border-color-secondary px-5">Actualizado</th>
            </tr>
        </thead>
        {response}
    </table>);
}

export default Table
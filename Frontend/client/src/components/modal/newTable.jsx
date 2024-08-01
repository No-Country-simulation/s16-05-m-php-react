import React, { useState } from 'react';
import Button1 from '../ui/button1';
import backgroundImage from "../../assets/backgroundImage.png";
import TableFourChairs from "@/components/table/4Chairs";
import TableTwoChairs from "@/components/table/2Chairs";
import TableSixChairs from "@/components/table/6Chairs";
import { createTable } from '@/axios/fetch';

const NewMesa = ({ isOpen, onClose }) => {
    const [mesa, setMesa] = useState(null);
    const [nombreMesa, setNombreMesa] = useState('');
    const [capacityTable, setCapacityTable] = useState('');
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const getMesa = (event) => {
        const capacity = event.target.value;
        setCapacityTable(capacity);
        const name = nombreMesa || 'mesa';
        if (capacity === "2") {
            setMesa(<TableTwoChairs name={name} />);
        } else if (capacity === "4") {
            setMesa(<TableFourChairs name={name} />);
        } else if (capacity === "6") {
            setMesa(<TableSixChairs name={name} />);
        }
    };

    const handleNombreChange = (event) => {
        const newName = event.target.value;
        setNombreMesa(newName);
        if (mesa) {
            const name = newName || 'mesa';
            setMesa(React.cloneElement(mesa, { name }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const capacidad = Number(capacityTable);
        const minCapacity = (capacidad - 1);
        try {
            const response = await createTable(nombreMesa, capacidad, minCapacity);
            if (response.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            setError("Este nombre de mesa ya existe");
        }
    };

    const close = () => {
        setMesa(null);
        setNombreMesa('');
        setCapacityTable('');
        setError('');
        onClose();
    };
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10" onClick={close}>
            <div className="bg-color-bg p-10 rounded-md relative border-2 border-color-secondary w-1/2 h-3/4 min-h-[580px]" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center"}} onClick={e => e.stopPropagation()}>
                <h1 className="text-3xl font-title font-bold text-color-secondary mb-5 text-center">Nueva mesa</h1>
                <form className='flex flex-col h-full justify-around py-10 items-center' onSubmit={handleSubmit}>
                    <input id='name'type="text" placeholder="Nombre de la mesa" className='min-w-56 w-1/2 px-3 py-2 rounded-md font-semibold text-color-bg' value={nombreMesa} onChange={handleNombreChange} required />
                    {error && <div className="text-red-500 font-semibold">{error}</div>}
                    <select id='capacity' className='min-w-56 w-1/2 px-3 py-2 rounded-md font-semibold text-color-bg' onChange={getMesa} value={capacityTable} required>
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="2">mínimo 1 persona - máximo 2 personas</option>
                        <option value="4">mínimo 3 personas - máximo 4 personas</option>
                        <option value="6">mínimo 5 personas - máximo 6 personas</option>
                    </select>
                    <div className='min-w-56 h-3/5 w-1/2 bg-color-bg rounded-md flex justify-center items-center'>
                        {mesa}
                    </div>
                    <div className='flex justify-around w-1/2 min-w-56'>
                        <Button1 type={"button"} text={"Cancelar"} onClick={close} />
                        <Button1 type={"submit"} variant={"confirm"} text={"Aceptar"} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewMesa;

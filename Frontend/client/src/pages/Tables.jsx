import React, { useEffect, useState } from "react";
import useTablesStore from "@/stores/useTableStore";
import TableFourChairs from "@/components/table/4Chairs";
import TableTwoChairs from "@/components/table/2Chairs";
import TableSixChairs from "@/components/table/6Chairs";
import NewMesa from "@/components/modal/newTable";
import EditMesa from "@/components/modal/editTable";
import Button1 from "@/components/ui/button1";

const Tables = () => {
  const { tables, error, loading, fetchTables } = useTablesStore();

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  const [isModalOpenNewMesa, setIsModalOpenNewMesa] = useState(false);
  const [isModalOpenEditMesa, setIsModalOpenEditMesa] = useState(false);
  const [idMesa, setIdMesa] = useState(null);
  const [nameMesa, setNameMesa] = useState(null);
  const [capacityMesa, setCapacityMesa] = useState(null);

  const openModalNewMesa = () => setIsModalOpenNewMesa(true);
  const closeModalNewMesa = () => setIsModalOpenNewMesa(false);
  const openModalEditMesa = () => setIsModalOpenEditMesa(true);
  const closeModalEditMesa = () => setIsModalOpenEditMesa(false);

  const dataMesa = (id, name, capacity) => {
    openModalEditMesa();
    setIdMesa(id);
    setNameMesa(name);
    setCapacityMesa(capacity);
  }
  if (loading) {
    return (
      <div className="flex justify-center w-full bg-color-bg h-[10vh]">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center w-full bg-color-bg h-[10vh]">
        {error}
      </div>
    );
  }

  if (!tables) {
    return (
      <div className="flex justify-center w-full h-[10vh] bg-color-bg">
        No se encontraron datos de las tablas.
      </div>
    );
  }

  const tablesResponse = tables["hydra:member"].map((table) => {
    if (table["capacity"] === 2) {
      return (
        <TableTwoChairs key={table.id} name={table.name} id={table.id} hover onClick={() => dataMesa(table.id, table.name, table.capacity)} />
      );
    }
    if (table["capacity"] === 4) {
      return (
        <TableFourChairs key={table.id} name={table.name} id={table.id} hover onClick={() => dataMesa(table.id, table.name, table.capacity)} />
      );
    }
    if (table["capacity"] === 6) {
      return (
        <TableSixChairs key={table.id} name={table.name} id={table.id} hover onClick={() => dataMesa(table.id, table.name, table.capacity)} />
      );
    }
  });

  return (
    <div className=" w-full h-[70vh] bg-color-bg">
      <div className="w-full flex justify-center my-4">
        <Button1 type="button" text="Agregar Una Nueva Mesa" onClick={openModalNewMesa} />
      </div>
      <NewMesa isOpen={isModalOpenNewMesa} onClose={closeModalNewMesa} />
      <div className="flex justify-center">
        {tablesResponse}
      </div>
      <EditMesa isOpen={isModalOpenEditMesa} onClose={closeModalEditMesa} id={idMesa} nameMesa={nameMesa} capacityMesa={capacityMesa}/>
    </div>
  );
};

export default Tables;

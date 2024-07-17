import React, { useEffect } from "react";
import useTablesStore from "@/stores/useTableStore";
import TableFourChairs from "@/components/table/4Chairs";
import TableTwoChairs from "@/components/table/2Chairs";
import TableSixChairs from "@/components/table/6Chairs";

const Tables = () => {
  const { tables, error, loading, fetchTables } = useTablesStore();

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

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

  const tablesResponse = tables['hydra:member'].map((table) => {
    if (table["capacity"] === 2) {
      return <TableTwoChairs name={table.name} id={table.id} reservedChairs={1} />;
    }
    if (table["capacity"] === 4) {
      return <TableFourChairs name={table.name} id={table.id} reservedChairs={3}/>;
    }
    if (table["capacity"] === 6) {
      return <TableSixChairs name={table.name} id={table.id} reservedChairs={5}/>;
    }
  });

  return (
    <div className="flex justify-center w-full h-[70vh] bg-color-bg">
      {tablesResponse}
    </div>
  );
};

export default Tables;
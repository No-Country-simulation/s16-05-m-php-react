import React, { useState, useEffect } from "react";
import useTablesStateStore from "@/stores/useTableStateStore";
import Button1 from "@/components/ui/button1";
import useReserveStore from "@/stores/useReserveStore";
import TableTwoChairs from "@/components/table/2Chairs";
import TableFourChairs from "@/components/table/4Chairs";
import TableSixChairs from "@/components/table/6Chairs";

const TablesUser = () => {
  const { date, time } = useReserveStore();
  const [tablesResponse, setTablesResponse] = useState(null);
  const { tables, error, loading, fetchTablesStates } = useTablesStateStore();
  const { attendee_count, setTable } = useReserveStore();
  const [dataTable, setDataTable] = useState(null);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    fetchTablesStates(date, time);
  }, [date, time]);

  useEffect(() => {
    if (tables !== null) {
      filtroTables();
    }
  }, [tables]);

  const filtroTables = () => {
    if (!tables || !tables["hydra:member"]) return; // Verifica si 'tables' y 'tables["hydra:member"]' son válidos
    var mesas = [];
    tables["hydra:member"].filter((table) => {
      if (attendee_count <= 2) {
        if (table["capacity"] === 2) {
          mesas.push(table);
        }
      } else if (attendee_count <= 4) {
        if (table["capacity"] === 4) {
          mesas.push(table);
        }
      } else if (attendee_count <= 6) {
        if (table["capacity"] === 6) {
          mesas.push(table);
        }
      }
    });
    filteredTables(mesas, null, null);
  };
  const filteredTables = (data, id, mesa) => {
    if (!data) return; // Verifica si 'data' es null o undefined
    setBool(false);
    setDataTable(mesa);
    var mesas = [];
    console.log("se hizo click");
    data.map((table) => {
      var reservedChairs = 0;
      var click = () => filteredTables(data, table.id, table);
      if (table.status === "reserved") {
        reservedChairs = table.capacity;
        click = () => {};
      }
      if (table.capacity === 2) {
        if (id === table.id) {
          mesas.push(
            <div className="scale-50 m-[-80px]" key={table.id}>
              <TableTwoChairs
                name={table.name}
                reservedChairs={reservedChairs}
                onClick={click}
                selected={true}
              />
            </div>
          );
          setTable({ name: table.name, id: table.id, "@id": table["@id"] });
          setBool(true);
        } else {
          mesas.push(
            <div className="scale-50 m-[-80px]" key={table.id}>
              <TableTwoChairs
                name={table.name}
                reservedChairs={reservedChairs}
                onClick={click}
              />
            </div>
          );
        }
      } else if (table.capacity === 4) {
        if (id === table.id) {
          mesas.push(
            <div className="scale-50 m-[-80px]" key={table.id}>
              <TableFourChairs
                name={table.name}
                reservedChairs={reservedChairs}
                onClick={click}
                selected={true}
              />
            </div>
          );
          setTable({ name: table.name, id: table.id, "@id": table["@id"] });
          setBool(true);
        } else {
          mesas.push(
            <div className="scale-50 m-[-80px]" key={table.id}>
              <TableFourChairs
                name={table.name}
                reservedChairs={reservedChairs}
                onClick={click}
              />
            </div>
          );
        }
      } else if (table.capacity === 6) {
        if (id === table.id) {
          mesas.push(
            <div className="scale-50 m-[-80px]" key={table.id}>
              <TableSixChairs
                name={table.name}
                reservedChairs={reservedChairs}
                onClick={click}
                selected={true}
              />
            </div>
          );
          setTable({ name: table.name, id: table.id, "@id": table["@id"] });
          setBool(true);
        } else {
          mesas.push(
            <div className="scale-50 m-[-80px]" key={table.id}>
              <TableSixChairs
                name={table.name}
                reservedChairs={reservedChairs}
                onClick={click}
              />
            </div>
          );
        }
      }
    });
    setTablesResponse(mesas);
  };

  const confirmClick = () => {
    if (bool === false) {
      alert("Por favor, seleccione una mesa");
      return;
    } else if (bool === true) {
      window.location.href = "/confirm";
    }
  };
  if (loading) {
    return (
      <div className="w-[100%] h-[100%] bg-color-bg ">
        <div
          role="status"
          className="flex h-screen justify-center mt-5 flex-col items-center max-w-[600px] mx-[auto] my-[0px] bg-[#272727]"
        >
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

  if (!tables) {
    return (
      <div className="flex justify-center w-full h-[10vh] bg-color-bg">
        No se encontraron datos de las tablas.
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center w-full h-[10vh] bg-color-bg">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between py-20 text-center">
      <p className="font-bold text-2xl text-color-text text-center">
        Seleccione una mesa
      </p>
      <div
        className="flex flex-wrap items-center justify-center max-w-sm 
      "
      >
        {tablesResponse}
      </div>
      <div className="flex justify-around items-center flex-wrap w-full max-w-sm ">
        <div className="my-3">
          <Button1
            text={"Regresar"}
            variant={"confirm"}
            onClick={() => (window.location.href = "/reserve")}
          />
        </div>
        <div className="my-3">
          <Button1 text={"Confirmar"} onClick={confirmClick} />
        </div>
      </div>
    </div>
  );
};

export default TablesUser;

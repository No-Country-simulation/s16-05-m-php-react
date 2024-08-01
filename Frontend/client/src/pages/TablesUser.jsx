import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useReserveStore from "@/stores/useReserveStore";
import useTablesStore from "@/stores/useTableStore";
import TableFourChairs from "@/components/table/4Chairs";
import TableTwoChairs from "@/components/table/2Chairs";
import TableSixChairs from "@/components/table/6Chairs";
import { Button } from "@/components/ui/button";
import { getTablesReserved } from "@/axios/fetch";

const TablesUser = () => {
  const { tables, error, loading, fetchTables } = useTablesStore();
  const { attendee_count, date, time, setTable } = useReserveStore();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [tableStates, setTableStates] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  useEffect(() => {
    const fetchTableStates = async () => {
      try {
        const response = await getTablesReserved(date, time);
        console.log("Table states response:", response);

        // Asegúrate de que `response` tenga la forma esperada
        if (
          response &&
          response["hydra:member"] &&
          Array.isArray(response["hydra:member"])
        ) {
          setTableStates(response["hydra:member"]);
        } else {
          console.error("Expected array but got:", response);
        }
      } catch (error) {
        console.error("Error fetching table states:", error);
      }
    };

    if (date && time) {
      fetchTableStates();
    }
  }, [date, time]);

  const handleSelectTable = (table) => {
    setSelectedTableId(table.id);
    setTable({ name: table.name, id: table.id, "@id": table["@id"] });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirm");
  };

  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/reserve");
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

  const filteredTables = tables["hydra:member"].filter((table) => {
    if (attendee_count <= 2) {
      return table["capacity"] === 2;
    } else if (attendee_count <= 4) {
      return table["capacity"] === 4;
    } else {
      return table["capacity"] === 6;
    }
  });

  const tablesResponse = filteredTables.map((table) => {
    const reservedTable = Array.isArray(tableStates)
      ? tableStates.find(
          (state) => state.id === table.id && state.status === "reserved"
        )
      : null;

    if (table["capacity"] === 2) {
      return (
        <TableTwoChairs
          key={table.id}
          name={table.name}
          id={table.id}
          hover
          onSelect={() => handleSelectTable(table)}
          selected={selectedTableId === table.id}
          isMobile={isMobile}
          reservedChairs={reservedTable ? 2 : null}
        />
      );
    }
    if (table["capacity"] === 4) {
      return (
        <TableFourChairs
          key={table.id}
          name={table.name}
          id={table.id}
          hover
          onSelect={() => handleSelectTable(table)}
          selected={selectedTableId === table.id}
          isMobile={isMobile}
          reservedChairs={reservedTable ? 4 : null}
        />
      );
    }
    if (table["capacity"] === 6) {
      return (
        <TableSixChairs
          key={table.id}
          name={table.name}
          id={table.id}
          hover
          onSelect={() => handleSelectTable(table)}
          selected={selectedTableId === table.id}
          isMobile={isMobile}
          reservedChairs={reservedTable ? 6 : null}
        />
      );
    }
  });

  return (
    <div className="flex h-screen font-title mt-5 flex-row  flex-wrap items-center justify-center max-w-[600px] mx-[auto] my-[0px] bg-[#272727]">
      <p className="font-bold text-2xl text-color-text mt-9">
        Seleccione una mesa
      </p>
      <div className="flex flex-row flex-wrap items-center text-3xl justify-center">
        {tablesResponse}
      </div>
      <div className="flex justify-end gap-[20px] w-[100%]">
        <Button
          className="bg-color-secondary w-[40%] font-bold font-title hover:bg-color-secondary px-[20px] py-[10px] text-[#000] border border-[#900B09]"
          onClick={handleReturn}
        >
          CANCELAR
        </Button>

        <Button
          className="bg-color-primary w-[40%] font-bold font-title hover:bg-color-primary px-[20px] py-[10px] border border-[#900B09]"
          onClick={handleSubmit}
        >
          SELECCIONAR
        </Button>
      </div>
    </div>
  );
};

export default TablesUser;

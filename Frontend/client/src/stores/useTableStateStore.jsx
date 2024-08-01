import { getTablesReserved } from "@/axios/fetch";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useTablesStateStore = create(
    devtools(
        (set) => ({
            tables: null,
            error: null,
            loading: false,
            fetchTablesStates: async (date, time) => {
                set({ loading: true, error: null });
                try {
                    const data = await getTablesReserved(date, time);
                    set({ tables: data, loading: false });
                } catch (error) {
                    set({
                        error: "Error al obtener los datos de la Base de Datos",
                        loading: false,
                    });
                }
            },
        }),
        { name: "TablesStoreState" }
    )
);

export default useTablesStateStore;
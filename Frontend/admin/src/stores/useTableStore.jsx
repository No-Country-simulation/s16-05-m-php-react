import { getTables } from "@/axios/fetch";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useTablesStore = create(
  devtools(
    (set) => ({
      tables: null,
      error: null,
      loading: false,
      fetchTables: async () => {
        set({ loading: true, error: null });
        try {
          const data = await getTables();
          set({ tables: data, loading: false });
        } catch (error) {
          set({
            error: "Error al obtener los datos de la Base de Datos",
            loading: false,
          });
        }
      },
    }),
    { name: "TablesStore" }
  )
);

export default useTablesStore;

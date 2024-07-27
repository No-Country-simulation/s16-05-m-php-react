import { getCategory } from "@/axios/fetch";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useCategoryStore = create(
    devtools(
        (set) => ({
            category: null,
            error: null,
            loading: false,
            fetchCategory: async () => {
                set({ loading: true, error: null });
                try {
                    const data = await getCategory();
                    set({ category: data, loading: false });
                } catch (error) {
                    set({
                        error: "Error al obtener los datos de la Base de Datos",
                        loading: false,
                    });
                }
            },
        }),
    { name: "CategoryStore" }
    )
);

export default useCategoryStore;

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// Define el store
const useReserveStore = create(
  devtools(
    persist(
      (set) => ({
        date: "",
        time: "",
        owner_first_name: "",
        owner_last_name: "",
        owner_phone_number: "",
        owner_email: "",
        modal: "true",
        table: {
          name: "",
          id: "",
          "@id": "", // Añadimos @id para almacenar el valor
        },
        number_of_people: 1,
        code: "", // Añadimos code para almacenar el código de la reserva
        setDate: (date) => set({ date }),
        setTime: (time) => set({ time }),
        setOwner_first_name: (owner_first_name) => set({ owner_first_name }),
        setOwner_last_name: (owner_last_name) => set({ owner_last_name }),
        setOwner_phone_number: (owner_phone_number) =>
          set({ owner_phone_number }),
        setOwner_email: (owner_email) => set({ owner_email }),
        setTable: (table) => set({ table }),
        setNumber_of_people: (number_of_people) => set({ number_of_people }),
        setCode: (code) => set({ code }), // Añadimos el setter para code
        setModal: (modal) => set({ modal }),
      }),
      {
        name: "reserve-storage",
        getStorage: () => localStorage,
      }
    ),
    { name: "reserve-store" } // Nombre para Redux DevTools
  )
);

// Exporta el store por defecto
export default useReserveStore;

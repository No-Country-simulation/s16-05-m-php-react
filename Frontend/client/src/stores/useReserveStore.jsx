import { create } from "zustand";
import { persist } from "zustand/middleware";

const useReserveStore = create(
  persist(
    (set) => ({
      date: "",
      time: "",
      owner_first_name: "",
      owner_last_name: "",
      owner_phone_number: "",
      owner_email: "",
      table: "",
      number_of_people: 1, // Nueva propiedad
      setDate: (date) => set({ date }),
      setTime: (time) => set({ time }),
      setOwner_first_name: (owner_first_name) => set({ owner_first_name }),
      setOwner_last_name: (owner_last_name) => set({ owner_last_name }),
      setOwner_phone_number: (owner_phone_number) =>
        set({ owner_phone_number }),
      setOwner_email: (owner_email) => set({ owner_email }),
      setTable: (table) => set({ table }),
      setNumber_of_people: (number_of_people) => set({ number_of_people }), // Nueva función
    }),
    {
      name: "reserve-storage", // nombre para el almacenamiento persistente
      getStorage: () => localStorage, // método de almacenamiento
    }
  )
);

export default useReserveStore;

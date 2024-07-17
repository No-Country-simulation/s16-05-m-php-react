import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools(
    (set) => ({
      email: "",
      password: "",
      token: "",
      role: "",
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setToken: (token) => set({ token }),
      setRole: (role) => set({ role }),
    }),
    { name: "AuthStore" }
  ) // Nombre opcional para identificar tu store en las DevTools
);

export default useAuthStore;

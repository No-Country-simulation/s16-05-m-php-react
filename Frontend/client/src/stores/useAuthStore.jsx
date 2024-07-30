import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      email: "",
      password: "",
      token: "",
      role: "",
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setToken: (token) => set({ token }),
      setRole: (role) => set({ role }),
      logout: () =>
        set(() => {
          localStorage.removeItem("auth");
          return { token: "", role: "", email: "", password: "" };
        }),
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;

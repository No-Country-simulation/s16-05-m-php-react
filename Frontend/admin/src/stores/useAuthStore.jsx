import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      email: "",
      password: "",
      token: "",
      role: "",
      username: "",
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setToken: (token) => set({ token }),
      setRole: (role) => set({ role }),
      setUsername: (username) => set({ username }),
      logout: () =>
        set(() => {
          localStorage.removeItem("auth");
          return { token: "", role: "", email: "", password: "", username: "" };
        }),
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;

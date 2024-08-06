import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser } from "@/axios/fetch";

const useAuthStore = create(
  persist(
    (set) => ({
      email: "",
      password: "",
      token: "",
      role: "",
      username: "",
      createdAt: "",
      expiresAt: "",
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setToken: (token) => set({ token }),
      setRole: (role) => set({ role }),
      setUsername: (username) => set({ username }),
      setCreatedAt: (createdAt) => set({ createdAt }),
      setExpiresAt: (expiresAt) => set({ expiresAt }),
      logout: () =>
        set(() => {
          localStorage.removeItem("auth");
          return { token: "", role: "", email: "", password: "", username: "", createdAt: "", expiresAt: "" };
        }),
      renovateToken: async () => {
        var auth = localStorage.getItem("auth").split('"');
        const response = await loginUser(auth[5], auth[9]);
        const { token } = response.data;
        setToken(token);
      },
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;

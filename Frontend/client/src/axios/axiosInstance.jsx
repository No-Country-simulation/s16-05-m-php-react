import { BASE_URL } from "@/utils/constants";
import axios from 'axios';
import useAuthStore from "@/stores/useAuthStore";
import { loginUser } from './fetch';

const instance = axios.create({
    baseURL: BASE_URL,
});


instance.interceptors.request.use(async (config) => {
    const token = useAuthStore.getState().token;
    const currentTime = Math.floor(Date.now() / 1000);
    const tokenExpiration = decodeTokenAndGetExpiration(token);
    const timeRemaining = tokenExpiration - currentTime;

    if (timeRemaining < 300) {
        try {
            const response = await loginUser(useAuthStore.getState().email, useAuthStore.getState().password);
            const newToken = response.data.token;
            useAuthStore.getState().setToken(newToken);
        } catch (error) {
            console.error('Error al renovar el token:', error);
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;

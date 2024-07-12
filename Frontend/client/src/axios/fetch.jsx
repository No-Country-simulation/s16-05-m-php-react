import { BASE_URL } from "@/utils/constants";
import axios from 'axios'

export const createUser = async (email, password) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/users`, {
            email,
            password
        })
        return data
    } catch (error) {
        console.log({ createUserError: error })
        return alert(error.response.data.errors[0].msg)
    }
}


export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      console.log(response.data);
      return response;
    } catch (error) {
      console.log({ loginUserError: error });
      alert('Usuario y/o contraseña incorrecta');
      throw error;
    }
  };

export const recoverPassword = async ( code, newPassword) =>{
    try {
        const response = await axios.post(`${BASE_URL}/user/reset-password`, {
            code,
            newPassword
          });
          return response.data;
    } catch (error) {
         alert(error.response.data.msg);
         return
    }
}
import { BASE_URL } from "@/utils/constants";
import axios from "axios";

export const createUser = async (email, password) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log({ createUserError: error });
    return alert(error.response.data.errors[0].msg);
  }
};

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
    alert("Usuario y/o contraseña incorrecta");
    throw error;
  }
};

export const recoverPassword = async (code, newPassword) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/reset-password`, {
      code,
      newPassword,
    });
    return response.data;
  } catch (error) {
    alert(error.response.data.msg);
    return;
  }
};

export const getTables = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tables`);
    return response.data;
  } catch (error) {
    console.error({ getTablesError: error });
    throw error;
  }
};

export const createTable = async (name, capacity, min_required_capacity) => {
  try {
    const response = await axios.post(`${BASE_URL}/tables`, {
      name,
      capacity,
      min_required_capacity,
    }, {
      headers: {
        "Content-Type": "application/ld+json"
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateTable = async (id, name, capacity, min_required_capacity) => {
  try {
    const response = await axios.put(`${BASE_URL}/tables/${id}`, {
      name,
      capacity,
      min_required_capacity,
    }, {
      headers: {
        "Content-Type": "application/ld+json"
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTable = async (id,) => {
  try {
    const response = await axios.delete(`${BASE_URL}/tables/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
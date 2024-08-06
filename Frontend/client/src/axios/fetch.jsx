import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import useAuthStore from "@/stores/useAuthStore";

/** CREACIÓN DE USUARIOS */
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

/** CRUD DE TABLAS */
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
  const { token } = useAuthStore.getState();
  try {
    const response = await axios.post(
      `${BASE_URL}/tables`,
      {
        name,
        capacity,
        min_required_capacity,
      },
      {
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateTable = async (
  id,
  name,
  capacity,
  min_required_capacity
) => {
  const { token } = useAuthStore.getState();
  try {
    const response = await axios.put(
      `${BASE_URL}/tables/${id}`,
      {
        name,
        capacity,
        min_required_capacity,
      },
      {
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteTable = async (id) => {
  const { token } = useAuthStore.getState();
  try {
    const response = await axios.delete(`${BASE_URL}/tables/${id}`, {
      headers: {
        "Content-Type": "application/ld+json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/** CRUD DE CATEGORÍAS */
export const getCategory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error({ getTablesError: error });
    throw error;
  }
};

export const createCategory = async (name, phrase) => {
  const { token } = useAuthStore.getState();
  try {
    const response = await axios.post(
      `${BASE_URL}/categories`,
      {
        name,
        phrase,
      },
      {
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const categoryImage = async (image, id) => {
  const { token } = useAuthStore.getState();
  try {
    const response = await axios.post(
      `${BASE_URL}/categories/${id}/image`,
      {
        image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id, name, phrase) => {
  const { token } = useAuthStore.getState();
  try {
    const response = await axios.put(
      `${BASE_URL}/categories/${id}`,
      {
        name,
        phrase,
      },
      {
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRestaurantName = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/restaurant-info`);
    console.log(response.data.name);
    return response.data.name;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id) => {
  const { token } = useAuthStore.getState();
  try {
    const response = await axios.delete(`${BASE_URL}/categories/${id}`, {
      headers: {
        "Content-Type": "application/ld+json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/** CRUD DE PRODUCTOS */

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories/${id}/products`);
    return response.data;
  } catch (error) {
    console.error({ getTablesError: error });
    throw error;
  }
};

export const createProduct = async (
  name,
  description,
  price,
  category,
  is_available
) => {
  const { token } = useAuthStore.getState();
  const categories = [];
  categories.push(`api/categories/${category}`);
  try {
    const response = await axios.post(
      `${BASE_URL}/products`,
      {
        name,
        description,
        price,
        categories,
        is_available,
      },
      {
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const productImage = async (image, id) => {
  const { token } = useAuthStore.getState();
  try {
    const response = await axios.post(
      `${BASE_URL}/products/${id}/image`,
      {
        image,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  id,
  name,
  description,
  price,
  available,
  category
) => {
  const { token } = useAuthStore.getState();
  const is_available = Boolean(available);
  const categories = [];
  categories.push(`api/categories/${category}`);
  try {
    const response = await axios.put(
      `${BASE_URL}/products/${id}`,
      {
        name,
        price,
        description,
        is_available,
        categories,
      },
      {
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  const { token } = useAuthStore.getState();
  try {
    const response = await axios.delete(`${BASE_URL}/products/${id}`, {
      headers: {
        "Content-Type": "application/ld+json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

/** Consultas de reservas por código */
export const getReservationByCode = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/reservations/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**CRUD Reservas */

export const getReservations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reservations`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createReservation = async (
  date,
  time,
  owner_first_name,
  owner_last_name,
  owner_phone_number,
  owner_email,
  table,
  attendee_count
) => {
  try {
    // Asegurarse de que el campo table esté en el formato correcto
    const formattedTable = typeof table === "string" ? table : table["@id"];

    const response = await axios.post(
      `${BASE_URL}/reservations`,
      {
        date,
        time,
        owner_first_name,
        owner_last_name,
        owner_phone_number,
        owner_email,
        table: formattedTable,
        attendee_count,
      },
      {
        headers: {
          "Content-Type": "application/ld+json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error({ createReservationError: error });
    throw error;
  }
};

export const getTablesReserved = async (date, time) => {
  try {
    const response = await axios.get(`${BASE_URL}/tables`, {
      params: {
        date,
        time,
      },
      headers: {
        Accept: "application/ld+json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelReserva = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/reservations/${id}/status`,{
      status: "canceled",
    },{
      headers: {
        "Content-Type": "application/ld+json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const confirmarReserva = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/reservations/${id}/status`,{
      status: "scheduled",
    },{
      headers: {
        "Content-Type": "application/ld+json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const editStatusReserve = async (id, status) => {
  try {
    const response = await axios.put(`${BASE_URL}/reservations/${id}/status`,{
      status,
    },{
      headers: {
        "Content-Type": "application/ld+json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
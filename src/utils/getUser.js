// pedidos axios
// Buscar al usuario logueado
import axios from "axios";

export const getUser = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/users/${id}`);
    return response.data.user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

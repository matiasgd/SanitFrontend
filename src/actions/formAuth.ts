import axios from "axios";
import { FieldValues } from "react-hook-form";
import customMessage from "../commons/customMessage";

interface RegistrationData {
  email: FieldValues;
  password: FieldValues;
  confirmPassword?: FieldValues;
}

export const handleFormRegister = async (data: RegistrationData) => {
  // New User
  if (data.password !== data.confirmPassword) {
    customMessage("error", "Las contraseñas no coinciden.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:3001/api/users/new",
      data
    );
    customMessage("success", response.data.message);
    return response;
  } catch (error: any) {
    console.log(error);
    customMessage("error", error.message);
  }
};

export const handleFormLogin = async (data: RegistrationData) => {
  // Login User
  try {
    const token = await axios.post(
      "http://localhost:3001/api/auth/login",
      data,
      { withCredentials: true }
    );
    customMessage("success", "Sesión iniciada!");
    return token.data;
  } catch (error: any) {
    customMessage("error", "Credenciales Inválidas");
  }
};

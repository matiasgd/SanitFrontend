import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn } from "../store/user";
import customMessage from "../commons/customMessage";
import { FieldValues } from "react-hook-form";

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
    //   setVariant("LOGIN"); ACA HABRIA QUE LOGUEAR AL NUEVO USUARIO
  } catch (error: any) {
    console.log(error);
    customMessage("error", error?.response?.data);
  }
};

export const handleFormLogin = async (data: RegistrationData) => {
  const dispatch = useDispatch();
  // Login User
  try {
    const token = await axios.post(
      "http://localhost:3001/api/auth/login",
      data,
      { withCredentials: true }
    );
    dispatch(logIn(token.data));
    customMessage("success", "Sesión iniciada!");
    return token;
  } catch (error: any) {
    customMessage("error", "Credenciales Inválidas");
  }
};

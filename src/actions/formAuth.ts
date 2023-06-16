import axios from "axios";
import { FieldValues } from "react-hook-form";
import customMessage from "../commons/customMessage";

interface RegistrationData {
  email: FieldValues;
  password: FieldValues;
  confirmPassword?: FieldValues;
}

export const handleFormRegister = async (data: RegistrationData) => {
  if (data.password !== data.confirmPassword) {
    customMessage("error", "Las contraseñas no coinciden.");
    return;
  }
  // New User
  await axios
    .post("http://localhost:3001/api/users/new", data)
    .then((res) => {
      customMessage("success", res?.data?.message);
    })
    .catch((err) => customMessage("error", err?.response?.data?.error));
};

export const handleFormLogin = async (data: RegistrationData) => {
  let res: any;
  // Login User
  await axios
    .post("http://localhost:3001/api/auth/login", data, {
      withCredentials: true,
    })
    .then((token) => {
      res = token;
      customMessage("success", "Sesión iniciada!");
    })
    .catch((err) => customMessage("error", err.response.data));

  return res.data;
};

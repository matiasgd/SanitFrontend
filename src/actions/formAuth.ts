import axios from "axios";
import { FieldValues } from "react-hook-form";
import customMessage from "../commons/customMessage";

interface RegistrationData {
  email: FieldValues;
  password: FieldValues;
  confirmPassword?: FieldValues;
}

interface PasswordRecoveryData {
  email?: FieldValues;
  password?: FieldValues;
  confirmPassword?: FieldValues;
  userId?: FieldValues;
}

export const handleFormRegister = async (data: RegistrationData) => {
  if (data.password !== data.confirmPassword) {
    customMessage("error", "Las contraseñas no coinciden.");
    return;
  }
  // New User
  await axios
    .post(`${import.meta.env.VITE_API_ROUTE}api/users/new`, data)
    .then((res) => {
      customMessage("success", res?.data?.message);
    })
    .catch((err) => customMessage("error", err?.response?.data?.error));
};

export const handleFormLogin = async (data: RegistrationData) => {
  let res: any;
  // Login User
  await axios
    .post(`${import.meta.env.VITE_API_ROUTE}api/auth/login`, data, {
      withCredentials: true,
    })
    .then((token) => {
      res = token;
      customMessage("success", "Sesión iniciada!");
    })
    .catch((err) => customMessage("error", err.response.data));

  return res.data;
};

export const handlePassword = async (data: PasswordRecoveryData) => {
  let res: any;
  // Login User
  await axios
    .post(`${import.meta.env.VITE_API_ROUTE}api/auth/recover`, data, {
      withCredentials: true,
    })
    .then((token) => {
      res = token;
      customMessage("success", "email de recuperacion enviado!");
    })
    .catch((err) => customMessage("error", err.response.data));

  return res.data;
};

export const handleSetNewPassword = async (data: PasswordRecoveryData) => {
  let res: any;
  // Login User
  await axios
    .post(`${import.meta.env.VITE_API_ROUTE}api/auth/resetpassword`, data, {
      withCredentials: true,
    })
    .then((token) => {
      res = token;
      customMessage("success", "La contraseña se actualizo exitosamente!");
    })
    .catch((err) => {
      console.log(err.response.data);
      customMessage("error", err.response.data);
    });

  return res.data;
};

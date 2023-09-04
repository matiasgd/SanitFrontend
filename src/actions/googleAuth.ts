import axios from "axios";
import jwt_decode from "jwt-decode";
import customMessage from "../commons/customMessage";

interface DecodedToken {
  email: string;
  sub: string;
}

export const handleGoogleRegister = async (credentialResponse: any) => {
  const decoded = jwt_decode(credentialResponse.credential) as DecodedToken;
  // New Google User
  await axios
    .post(`${import.meta.env.VITE_API_ROUTE}api/users/new`, {
      email: decoded.email,
      password: decoded.sub,
      confirmPassword: decoded.sub,
    })
    .then((res) => {
      customMessage("success", res?.data?.message);
    })
    .catch((err) => customMessage("error", err?.response?.data?.error));
};

export const handleGoogleLogin = async (credentialResponse: any) => {
  const decoded = jwt_decode(credentialResponse.credential) as DecodedToken;
  // Login Google User
  try {
    const token = await axios.post(
      `${import.meta.env.VITE_API_ROUTE}api/auth/login`,
      {
        email: decoded.email,
        password: decoded.sub,
      },
      { withCredentials: true }
    );
    customMessage("success", "Sesión iniciada!");
    return token.data;
  } catch (error: any) {
    customMessage("error", "Algo salió mal, intente nuevamente");
  }
};

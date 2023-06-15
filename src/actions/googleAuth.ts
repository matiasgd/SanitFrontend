import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logIn } from "../store/user";
import customMessage from "../commons/customMessage";

interface DecodedToken {
  email: string;
  sub: string;
}

export const handleGoogleRegister = async (credentialResponse: any) => {
  const decoded = jwt_decode(credentialResponse.credential) as DecodedToken;
  // New Google User
  try {
    const response = await axios.post("http://localhost:3001/api/users/new", {
      email: decoded.email,
      password: decoded.sub,
      confirmPassword: decoded.sub,
    });
    customMessage("success", response.data);
    return response;
    //setVariant("LOGIN");
  } catch (error: any) {
    console.log(error);
    customMessage("error", error?.response?.data);
  }
};

export const handleGoogleLogin = async (credentialResponse: any) => {
  const dispatch = useDispatch();
  const decoded = jwt_decode(credentialResponse.credential) as DecodedToken;
  // Login Google User
  try {
    const token = await axios.post(
      "http://localhost:3001/api/auth/login",
      {
        email: decoded.email,
        password: decoded.sub,
      },
      { withCredentials: true }
    );
    dispatch(logIn(token.data));
    customMessage("success", "Sesión iniciada!");
    //user = token.data; // Triggers the useEffect
    return token;
  } catch (error: any) {
    customMessage("error", "Credenciales Inválidas");
  }
};

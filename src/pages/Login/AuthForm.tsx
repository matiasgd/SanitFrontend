import { useState, useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../commons/Input";
import Button from "../../commons/Button";
import customMessage from "../../commons/customMessage";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logIn } from "../../store/user";
import logo from "/logo.png";
import { handleFormLogin, handleFormRegister } from "../../actions/formAuth";
import {
  handleGoogleLogin,
  handleGoogleRegister,
} from "../../actions/googleAuth";
import { LoadingOutlined } from "@ant-design/icons";

type Variant = "LOGIN" | "REGISTER";

interface RegistrationData {
  email: FieldValues;
  password: FieldValues;
  confirmPassword?: FieldValues;
}

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [passwordRecovery, setPasswordRecovery] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user?.id) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (variant === "REGISTER") {
      try {
        await handleFormRegister(data as RegistrationData);
        setVariant("LOGIN");
      } catch (error: any) {
        console.log(error);
      }
    }
    if (variant === "LOGIN") {
      try {
        const token: any = await handleFormLogin(data as RegistrationData);
        dispatch(logIn(token));
      } catch (error: any) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    // New Google User
    if (variant === "REGISTER") {
      try {
        await handleGoogleRegister(credentialResponse);
        setVariant("LOGIN");
      } catch (error: any) {
        console.log(error.message);
      }
    }
    // Login Google User
    if (variant === "LOGIN") {
      try {
        const token = await handleGoogleLogin(credentialResponse);
        dispatch(logIn(token));
      } catch (error: any) {
        console.log(error.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (passwordRecovery) {
      navigate("/password");
    }
  }, [passwordRecovery]);

  return (
    <div className="relative h-[100vh]">
      <div className="absolute top-0 right-0 w-[20vh] h-[10vh] sm:w-[25vh] sm:h-[15vh] md:w-[35vh] md:h-[25vh] lg:w-[45vh] lg:h-[35vh] bg-[#EB6350] rounded-bl-[75vh] z-20" />
      <div className="absolute w-full h-[5vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-[#2AAAE1] z-10" />
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 md:px-7 lg:px-8 bg-[#154E64]">
        <div className="mx-auto p-2 z-30 rounded-lg bg-white cursor-pointer hover:scale-110">
          <img
            src={logo}
            alt="logo"
            className="mx-auto w-auto h-20"
            onClick={() => navigate("/home")}
          />
        </div>
        <div className="mt-6 mx-auto w-[90%] sm:max-w-lg z-30">
          <div className="bg-white px-4 py-8 shadow rounded-lg sm:px-10">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-800">
              {variant === "REGISTER" ? "Registrarse" : "Ingresar"}
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="mail@example.com"
                register={register}
                errors={errors}
                disabled={loading}
              />
              <Input
                id="password"
                label="Contraseña"
                type="password"
                placeholder="Mínimo 8 carácteres"
                register={register}
                errors={errors}
                disabled={loading}
              />
              {variant === "REGISTER" && (
                <Input
                  id="confirmPassword"
                  label="Repetir Contraseña"
                  placeholder="Mínimo 8 carácteres"
                  type="password"
                  register={register}
                  errors={errors}
                  disabled={loading}
                />
              )}
              <div>
                <Button disabled={loading} fullWidth type="submit">
                  {loading ? (
                    <LoadingOutlined className="text-2xl" />
                  ) : variant === "LOGIN" ? (
                    "Iniciar Sesión"
                  ) : (
                    "Registrarse"
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500" />
                </div>
              </div>
              <div className="mt-6 flex relative justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleSuccess(credentialResponse);
                  }}
                  onError={() => {
                    customMessage(
                      "error",
                      "Inicio de sesión de Google fallido."
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
              <div>
                {variant === "LOGIN"
                  ? "No tienes una cuenta?"
                  : "Ya tienes tu cuenta?"}
              </div>
              <div onClick={toggleVariant} className="underline cursor-pointer">
                {variant === "LOGIN" ? "Crear cuenta" : "Iniciar sesión"}
              </div>
            </div>
            <div className="flex gap-2 justify-center text-sm mt-2 px-2 text-gray-500">
              <div>
                {variant === "LOGIN" ? "No recordas tu contraseña?" : ""}
              </div>
              <div
                onClick={() =>
                  setPasswordRecovery(passwordRecovery === false ? true : false)
                }
                className="underline cursor-pointer"
              >
                {variant === "LOGIN" ? "Recuperar contraseña" : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

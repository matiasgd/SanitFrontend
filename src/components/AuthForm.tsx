import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../commons/Input";
import Button from "../commons/Button";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logIn } from "../store/user";
import logo from "/logo.jpeg";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.profile) {
      navigate("/me");
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
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    // New User
    //   if (variant === "REGISTER") {
    //     axios
    //       .post("/api/register", data)
    //       .then(() => {
    //         signIn("credentials", data);
    //         toast.success("Cuenta creada!");
    //       })
    //       .catch(() => toast.error("Algo salió mal, intente más tarde."))
    //       .finally(() => setLoading(false));
    //   }
    // Login User
    if (variant === "LOGIN") {
      try {
        const token = await axios.post(
          "http://localhost:3001/api/auth/login",
          data,
          { withCredentials: true }
        );
        dispatch(logIn(token.data));
        toast.success("Sesión iniciada!");
        navigate("/me");
      } catch (error) {
        toast.error("Credenciales Inválidas");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 md:px-7 lg:px-8 bg-gray-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src={logo} alt="logo" className="mx-auto w-auto h-20 rounded-lg" />
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-800">
            Ingresar
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input
                id="name"
                label="Nombre"
                register={register}
                errors={errors}
                disabled={loading}
              />
            )}
            <Input
              id="email"
              label="Email"
              type="email"
              register={register}
              errors={errors}
              disabled={loading}
            />
            <Input
              id="password"
              label="Contraseña"
              type="password"
              register={register}
              errors={errors}
              disabled={loading}
            />
            <div>
              <Button disabled={loading} fullWidth type="submit">
                {variant === "LOGIN" ? "Iniciar Sesión" : "Registrarse"}
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
                  console.log(credentialResponse);
                }}
                onError={() => {
                  toast.error("Google login failed, try later");
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
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

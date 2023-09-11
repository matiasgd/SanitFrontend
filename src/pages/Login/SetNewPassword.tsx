import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../commons/Input";
import Button from "../../commons/Button";
import { useNavigate } from "react-router-dom";
import customMessage from "../../commons/customMessage";
import logo from "/logo.png";
import { handleSetNewPassword } from "../../actions/formAuth";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface PasswordRecoveryData {
  password: FieldValues;
  confirmPassword: FieldValues;
  userId: FieldValues;
}

interface DecodedToken {
  userId: string;
}

const SetNewPassword = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const originalToken = atob(token as string);
  const decoded: DecodedToken | undefined = jwtDecode(originalToken);
  const userId = decoded?.userId;
  console.log(userId, "userId");
  if (!token) {
    customMessage("error", "Este link ha expirado");
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      userId: userId,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      await handleSetNewPassword(data as PasswordRecoveryData);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="relative h-[100vh]">
      <div className="absolute top-0 right-0 w-[20vh] h-[10vh] sm:w-[25vh] sm:h-[15vh] md:w-[35vh] md:h-[25vh] lg:w-[45vh] lg:h-[35vh] bg-[#EB6350] rounded-bl-[75vh] z-20" />
      <div className="absolute w-full h-[5vh] sm:h-[10vh] md:h-[20vh] lg:h-[30vh] bg-[#2AAAE1] z-10" />
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 md:px-7 lg:px-8 bg-[#154E64]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md z-30">
          <img
            src={logo}
            alt="logo"
            className="mx-auto w-auto h-20 rounded-lg cursor-pointer hover:scale-110"
            onClick={() => navigate("/home")}
          />
        </div>
        <div className="mt-6 mx-auto w-[90%] sm:max-w-lg z-30">
          <div className="bg-white px-4 py-8 shadow rounded-lg sm:px-10">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-800">
              Selecciona una nueva contraseña
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="password"
                label="Contraseña"
                type="password"
                placeholder="Mínimo 8 carácteres"
                register={register}
                errors={errors}
                disabled={loading}
              />
              <Input
                id="confirmPassword"
                label="Repetir Contraseña"
                placeholder="Mínimo 8 carácteres"
                type="password"
                register={register}
                errors={errors}
                disabled={loading}
              />
              <div>
                <Button disabled={loading} fullWidth type="submit">
                  {loading ? (
                    <LoadingOutlined className="text-2xl" />
                  ) : (
                    "Cambiar contraseña"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;

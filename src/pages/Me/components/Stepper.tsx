import { useState } from "react";
import { Steps, theme } from "antd";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Input from "../../../commons/Input";
import Button from "../../../commons/Button";
import RHFDatePicker from "../../../commons/DatePicker";
import CustomSelect from "../../../commons/Select";
import CustomSegmented from "../../../commons/Segmented";
import axios from "axios";
import customMessage from "../../../commons/customMessage";

const Stepper: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { token } = theme.useToken();

  let user = useSelector((state: RootState) => state.user);

  // const getUser = async () => {
  //   await axios
  //     .get(`http://localhost:3001/api/users/${user.id}`)
  //     .then((user) => {
  //       console.log(user);

  //       setUserData(user.data.user);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   if (user?.id) {
  //     getUser();
  //   }
  // }, [user]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      lastName: "",
      identityType: "",
      identityNumber: "",
      birthdate: "",
      cellphone: "",
      gender: "",
      country: "",
      province: "",
      city: "",
      field: "",
      specialty: "",
      medicalRegistration: "",
      profileCompleted: true,
    },
  });

  const submitProfile: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios
        .put(`${import.meta.env.VITE_API_ROUTE}/api/users/${user.id}/edit`, data)
        .then(() => customMessage("success", "Perfil actualizado!"));
    } catch (error) {
      console.error(error);
      customMessage("error", "Algo salió mal :(");
    }
  };

  const stepContents = [
    {
      title: "Datos",
      content: (
        <form
          className="w-full grid grid-cols-2 gap-x-4 justify-center p-1"
          onSubmit={handleSubmit(submitProfile)}
        >
          <Input
            id="name"
            label="Nombre"
            placeholder="René"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="lastName"
            label="Apellido"
            placeholder="Favaloro"
            type="text"
            register={register}
            errors={errors}
          />
          <CustomSelect
            label="Tipo de Documento"
            placeholder="Seleccione una opción"
            control={control}
            name="identityType"
            options={[
              { value: "nationalId", label: "Documento de Identidad" },
              { value: "passport", label: "Pasaporte" },
              { value: "foreignId", label: "Cédula Extranjera" },
              { value: "other", label: "Otro" },
            ]}
          />
          <Input
            id="identityNumber"
            label="Número de Documento"
            placeholder="XX XXX XXX"
            type="number"
            register={register}
            errors={errors}
          />
          <RHFDatePicker
            label="Fecha de Nacimiento"
            placeholder="Seleccione una fecha"
            control={control}
            name="birthdate"
          />
          <CustomSelect
            label="Género"
            placeholder="Seleccione una opción"
            control={control}
            name="gender"
            options={[
              { value: "male", label: "Masculino" },
              { value: "female", label: "Femenino" },
              { value: "nongender", label: "No Binario" },
              { value: "other", label: "Otro" },
            ]}
          />
          <Input
            id="cellphone"
            label="Celular"
            placeholder="+54 11 22334455"
            type="number"
            register={register}
            errors={errors}
          />
          <Input
            id="country"
            label="País de Residencia"
            placeholder="Argentina"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="province"
            label="Provincia de Residencia"
            placeholder="Buenos Aires"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="city"
            label="Ciudad"
            placeholder="Ciudad de Buenos Aires"
            type="text"
            register={register}
            errors={errors}
          />
        </form>
      ),
    },
    {
      title: "Estudios",
      content: (
        <div className="grid grid-cols-2 gap-6 justify-center p-2">
          <Input
            id="field"
            label="Campo"
            placeholder="Psicología, Dermatología, Odontología..."
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="specialty"
            label="Especialidad"
            placeholder="Psiquiatría"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="medicalRegistration"
            label="Matrícula Médica"
            placeholder="99999"
            type="text"
            register={register}
            errors={errors}
          />
        </div>
      ),
    },
    {
      title: "Objetivo",
      content: (
        <div className="flex justify-center p-2">
          <CustomSegmented name="objective" control={control} />
        </div>
      ),
    },
    // Add other steps here
  ];

  const items = stepContents.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  // Controls
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle: React.CSSProperties = {
    lineHeight: "60px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{stepContents[current].content}</div>
      <div className="mt-4 flex justify-between">
        {current > 0 && (
          <Button type="button" onClick={prev}>
            Volver
          </Button>
        )}
        {current === stepContents.length - 1 && (
          <Button type="submit" onClick={handleSubmit(submitProfile)}>
            Finalizar
          </Button>
        )}
        {current < stepContents.length - 1 && (
          <Button type="button" onClick={next}>
            Siguiente
          </Button>
        )}
      </div>
    </>
  );
};

export default Stepper;

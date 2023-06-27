import { useEffect, useState } from "react";
import { Steps, theme } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Input from "../commons/Input";
import Button from "../commons/Button";
import RHFDatePicker from "../commons/DatePicker";
import CustomSelect from "../commons/Select";
import CustomSegmented from "../commons/Segmented";
import axios from "axios";

const Stepper: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { token } = theme.useToken();

  let user = useSelector((state: RootState) => state.user);

  const getUser = async () => {
    await axios
      .get(`http://localhost:3001/api/users/${user.id}`)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user?.id) {
      getUser();
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{
    name: string;
    lastname: string;
    identityType: string;
    identityNumber: number;
    birthdate: string;
    gender: string;
    country: string;
    specialty: string;
    medicalRegistration: string;
    objective: string;
  }>();

  const submitProfile: SubmitHandler<{
    name: string;
    lastname: string;
    identityType: string;
    identityNumber: number;
    birthdate: string;
    gender: string;
    country: string;
    specialty: string;
    medicalRegistration: string;
    objective: string;
  }> = (data) => {
    console.log(data);
  };

  const stepContents = [
    {
      title: "Datos Personales",
      content: (
        <form
          className="grid grid-cols-3 gap-6 justify-center p-2"
          onSubmit={handleSubmit(submitProfile)}
        >
          <Input
            id="name"
            label="Nombre"
            placeholder="Ingrese su nombre"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="lastname"
            label="Apellido"
            placeholder="Ingrese su apellido"
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
          <Input
            id="country"
            label="País de Residencia"
            placeholder="País de Residencia"
            type="text"
            register={register}
            errors={errors}
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
          <RHFDatePicker
            label="Fecha de Nacimiento"
            placeholder="Seleccione una fecha"
            control={control}
            name="birthdate"
          />
        </form>
      ),
    },
    {
      title: "Estudios y Experiencia",
      content: (
        <div className="grid grid-cols-2 gap-6 justify-center p-2">
          <Input
            id="specialty"
            label="Especialidad"
            placeholder="Ingrese su especialidad"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="medicalRegistration"
            label="Matrícula Médica"
            placeholder="Ingrese su matrícula"
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

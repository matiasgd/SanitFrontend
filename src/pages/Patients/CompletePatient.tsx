import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import customMessage from "../../commons/customMessage";
import Input from "../../commons/Input";
import Button from "../../commons/Button";
import CustomSelect from "../../commons/Select";
import RHFDatePicker from "../../commons/DatePicker";
import { commonNationalities } from "../../constans/nationalities";

interface DecodedToken {
  doctorId: string;
  patientId: string;
}

const CompletePatient = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const originalToken = atob(token as string);
  const decoded: DecodedToken | undefined = jwtDecode(originalToken);

  const [isLoading, setIsLoading] = useState(false);
  const patientId = decoded?.patientId;

  if (!token) {
    customMessage("error", "Este link ha expirado");
    return null;
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      lastName: "",
      govermentId: "",
      nationality: "",
      email: "",
      birthdate: "",
      gender: "",
      codCountry: "",
      codArea: "",
      cellphone: "",
      country: "",
      state: "",
      city: "",
      street: "",
      streetNumber: "",
      addressType: "",
      addressFloor: "",
      zipCode: "",
      healthInsurance: "",
      healthInsuranceNumber: "",
      privateHealthInsurance: "",
      privateHealthInsuranceNumber: "",
      contactName: "",
      contactLastName: "",
      contactRelationship: "",
      contactPhone: "",
    },
  });

  const submitModal: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_ROUTE}/api/patients/update/${patientId}`,
        data
      );
      customMessage("success", "Datos actualizados, muchas gracias!");
      navigate("/home");
    } catch (error) {
      customMessage("error", "Algo salió mal.");
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submitModal)}
      className="flex flex-col gap-4 p-10"
    >
      <div className="flex justify-center m-3 ">
        <p className="text-md font-semibold">Actualizar Datos</p>
      </div>
      <div className="flex justify-center bg-[#EEEFF4] rounded-[20px] h-8 items-center">
        <p className="text-sm font-semibold">Datos Generales</p>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 justify-center ">
          <Input
            id="name"
            label="Nombre"
            placeholder=""
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="lastName"
            label="Apellido"
            placeholder=""
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          <Input
            id="govermentId"
            label="DNI / ID"
            placeholder=""
            type="number"
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
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          <CustomSelect
            label="Nacionalidad"
            placeholder="Seleccione una opción"
            control={control}
            name="nationality"
            options={commonNationalities}
          />

          <RHFDatePicker
            label="Fecha de Nacimiento"
            placeholder="Seleccione una fecha"
            control={control}
            name="birthdate"
          />
        </div>
      </div>
      <div className="flex justify-center bg-[#EEEFF4] rounded-[20px] h-8 items-center">
        <p className="text-sm font-semibold">Contacto</p>
      </div>
      <div className="grid grid-rows gap-4 justify-center">
        <div className="flex gap-4">
          <Input
            id="codCountry"
            label="Cód. País"
            placeholder="+54"
            type="number"
            register={register}
            errors={errors}
          />
          <Input
            id="codArea"
            label="Cód. Area"
            placeholder="011"
            type="number"
            register={register}
            errors={errors}
          />
          <Input
            id="cellphone"
            label="Teléfono"
            placeholder="123 - 4567"
            type="number"
            register={register}
            errors={errors}
          />
        </div>
        <Input
          id="email"
          label="Email"
          placeholder="Email del paciente"
          type="email"
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex justify-center bg-[#EEEFF4] rounded-[20px] h-8 items-center">
        <p className="text-sm font-semibold">Direccion</p>
      </div>
      <div className="grid grid-cols-2 gap-4 justify-center">
        <CustomSelect
          label="País"
          placeholder="Ingrese país"
          control={control}
          name="country"
          options={[
            { value: "arg", label: "Argentina" },
            { value: "bra", label: "Brazil" },
            { value: "uru", label: "Uruguay" },
            { value: "chi", label: "Chile" },
            { value: "bol", label: "Bolivia" },
            { value: "per", label: "Perú" },
            { value: "col", label: "Colombia" },
            { value: "ven", label: "Venezuela" },
            { value: "ecu", label: "Ecuador" },
          ]}
        />
        <Input
          id="state"
          label="Provincia"
          placeholder="Ingrese provincia"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          id="city"
          label="Localidad"
          placeholder="Ingrese localidad"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          id="street"
          label="Calle"
          placeholder="Calle Falsa"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          id="streetNumber"
          label="Número"
          placeholder="1234"
          type="number"
          register={register}
          errors={errors}
        />
        <CustomSelect
          label="Casa / Departamento"
          placeholder="Seleccionar"
          control={control}
          name="addressType"
          options={[
            { value: "House", label: "Casa" },
            { value: "Appartment", label: "Departamento" },
          ]}
        />
        <Input
          id="addressFloor"
          label="Piso / Letra"
          placeholder="1B"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          id="zipCode"
          label="Código Postal"
          placeholder="1111"
          type="number"
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex justify-center bg-[#EEEFF4] rounded-[20px] h-8 items-center">
        <p className="text-sm font-semibold">Seguro médico</p>
      </div>
      <div className="grid grid-cols-2 gap-4 justify-center">
        <Input
          id="healthInsurance"
          label="Obra Social"
          placeholder="Ingrese obra social"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          id="healthInsuranceNumber"
          label="Número OOSS"
          placeholder=""
          type="number"
          register={register}
          errors={errors}
        />
        <Input
          id="privateHealthInsurance"
          label="Prepaga"
          placeholder="Ingrese prepaga"
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          id="privateHealthInsuranceNumber"
          label="Número Prepaga"
          placeholder=""
          type="number"
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex justify-center bg-[#EEEFF4] rounded-[20px] h-8 items-center">
        <p className="text-sm font-semibold">Contacto de emergencia</p>
      </div>
      <div className="grid grid-cols-2 gap-4 justify-center">
        <Input
          id="contactName"
          label="Nombre"
          placeholder=""
          type="text"
          register={register}
          errors={errors}
        />
        <Input
          id="contactLastName"
          label="Apellido"
          placeholder=""
          type="text"
          register={register}
          errors={errors}
        />
        <CustomSelect
          label="Relación"
          placeholder="Seleccione una opción"
          control={control}
          name="contactRelationship"
          options={[
            { value: "padre", label: "Padre" },
            { value: "madre", label: "Madre" },
            { value: "abuelo/a", label: "Abuelo/a" },
            { value: "hermano/a", label: "Hermano/a" },
            { value: "hijo/a", label: "Hijo/a" },
            { value: "pareja", label: "Pareja" },
            { value: "amigo/a", label: "Amigo/a" },
            { value: "tio/a", label: "Tio/a" },
            { value: "otro", label: "Otro" },
          ]}
        />
        <Input
          id="contactPhone"
          label="Teléfono"
          placeholder="+54-119123-1234"
          type="number"
          register={register}
          errors={errors}
        />
      </div>
      <div className="mt-6 flex items-center justify-center gap-x-6">
        <Button disabled={isLoading} fullWidth type="submit">
          Guardar
        </Button>
      </div>
    </form>
  );
};

export default CompletePatient;

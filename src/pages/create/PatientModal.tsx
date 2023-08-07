import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import customMessage from "../../commons/customMessage";
import Modal from "../../commons/Modal";
import Input from "../../commons/Input";
import Button from "../../commons/Button";
import CustomSelect from "../../commons/Select";
import RHFDatePicker from "../../commons/DatePicker";
import { commonNationalities } from "../../constans/nationalities";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface PatientModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;

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
    console.log(doctorId, "Doctor ID");
    console.log(data, "Datos enviados");
    try {
      customMessage("success", "Abrir la Consola");
      await axios.post(
        `http://localhost:3001/api/patients/new/${doctorId}`,
        data
      );
    } catch (error) {
      customMessage("error", "Algo salió mal.");
      console.error(error);
    }
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit(submitModal)}
        className="flex flex-col gap-4 w-full"
      >
        <p className="text-md font-semibold">Nuevo Paciente</p>
        <div className="flex bg-[#EEEFF4] rounded-md h-8 justify-start items-center">
          <p className="text-md p-4">Datos Generales</p>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          <Input
            id="name"
            label="Nombre"
            placeholder="Nombre del paciente"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="lastName"
            label="Apellido"
            placeholder="Apellido del paciente"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="govermentId"
            label="DNI / ID"
            placeholder="XX XXX XXX"
            type="number"
            register={register}
            errors={errors}
          />
          <CustomSelect
            label="Nacionalidad"
            placeholder="Seleccione una opción"
            control={control}
            name="nationality"
            options={commonNationalities}
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
        </div>

        <div className="flex bg-[#EEEFF4] rounded-md h-8 justify-start items-center">
          <p className="text-md p-4">Contacto</p>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          <div className="flex">
            <Input
              id="codCountry"
              label="Cód. País"
              placeholder="XXX"
              type="number"
              register={register}
              errors={errors}
            />
            <Input
              id="codArea"
              label="Cód. Area"
              placeholder="XXX"
              type="number"
              register={register}
              errors={errors}
            />
            <Input
              id="cellphone"
              label="Teléfono"
              placeholder="XXX XXX"
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
        <div className="flex bg-[#EEEFF4] rounded-md h-8 justify-start items-center">
          <p className="text-md p-4">Dirección</p>
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
        <div className="flex bg-[#EEEFF4] rounded-md h-8 justify-start items-center">
          <p className="text-md p-4">Seguro Médico</p>
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
            placeholder="XXXX XXXX XXXX XXXX"
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
            placeholder="XXXX XXXX XXXX XXXX"
            type="number"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex bg-[#EEEFF4] rounded-md h-8 justify-start items-center">
          <p className="text-md p-4">Contacto de emergencia</p>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          <Input
            id="contactName"
            label="Nombre"
            placeholder="Nombre del contacto"
            type="text"
            register={register}
            errors={errors}
          />
          <Input
            id="contactLastName"
            label="Apellido"
            placeholder="Apellido del contacto"
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
            placeholder="XX XXX XXX"
            type="number"
            register={register}
            errors={errors}
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            secondary
            type="button"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button disabled={isLoading} type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PatientModal;

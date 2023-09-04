import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import customMessage from "../../commons/customMessage";
import Modal from "../../commons/Modal";
import Input from "../../commons/Input";
import Button from "../../commons/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface FastPatientProps {
  isOpen?: boolean;
  onClose: () => void;
}

const FastPatientModal: React.FC<FastPatientProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
    },
  });

  const submitModal: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_ROUTE}api/patients/new/${doctorId}`,
        data
      );
      customMessage("success", "Paciente creado");
      await axios.post(
        `${import.meta.env.VITE_API_ROUTE}api/patients/form/${doctorId}`,
        data
      );
    } catch (error) {
      customMessage("error", "Algo salió mal");
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
        <div className="flex flex-col justify-center gap-4">
          <p className="text-md font-bold">Crear Paciente</p>
          <p className="text-sm">
            Genera un paciente rápido y fácil con los datos mínimos, le
            mandaremos un mail para que complete el resto.
          </p>
        </div>
        <div className="flex justify-center bg-[#EEEFF4] rounded-[20px] h-8 items-center">
          <p className="text-sm font-semibold">Datos Generales</p>
        </div>
        <div>
          <div className="flex flex-col gap-4 justify-center">
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
              id="email"
              label="Email"
              placeholder="Email del paciente"
              type="email"
              register={register}
              errors={errors}
            />
          </div>
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
            Crear
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FastPatientModal;

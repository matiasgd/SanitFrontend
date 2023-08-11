import axios from "axios";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import customMessage from "../../commons/customMessage";
import Modal from "../../commons/Modal";
import RHFDatePicker from "../../commons/DatePicker";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Button, Select } from "antd";
const { Option } = Select;
import { UserOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import PatientModal from "./PatientModal";
import ServiceModal from "./ServiceModal";
import CustomSelect from "../../commons/Select";
import SelectAutocomplete from "../../commons/SelectAutocomplete";
import ServiceForm from "../services/Service";

interface AppointmentModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

interface Patient {
  _id: string;
  name: string;
  lastName: string;
  govermentId: string;
}

interface Services {
  _id: string;
  name: string;
  lastName: string;
  govermentId: string;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      date: "",
      timeOfAppointment: "",
      patient: "",
      doctor: doctorId,
      address: "",
      service: "",
      paymentMethod: "",
    },
  });

  const submitModal: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      customMessage("success", "Abrir la Consola");
      await axios.post(`http://localhost:3001/api/appointments/new`, data);
    } catch (error) {
      customMessage("error", "Algo salió mal.");
      console.error(error);
    }
    onClose();
    reset();
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit(submitModal)}
        className="flex flex-col gap-4 w-full"
      >
        <p className="text-md font-semibold">Nuevo turno</p>
        <div className="flex bg-[#EEEFF4] rounded-md h-8 justify-start items-center">
          <p className="text-md p-4">Datos requeridos</p>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center ">
          <RHFDatePicker
            label="Fecha del turno"
            placeholder="Seleccione una fecha"
            control={control}
            name="date"
          />
          <SelectAutocomplete
            control={control}
            doctorId={doctorId}
            onSelect={(value) => {
              if (value === "create") {
                return setIsCreatingPatient(true);
              }
              setSelectedPatient(value);
            }}
            label="Paciente"
            createText="Crear paciente"
            typeOfSearch="patients"
            name="patient"            
          />
          <SelectAutocomplete
            control={control}
            doctorId={doctorId}
            onSelect={(value) => {
              if (value === "create") {
                return setIsCreatingService(true);
              }
              setSelectedService(value);
            }}
            label="Servicio"
            createText="Crear servicio"
            typeOfSearch="services"
            name="service"
          />
        </div>
        <CustomSelect
          label="Metodo de pago"
          placeholder="Seleccione una opción de pago"
          control={control}
          name="paymentMethod"
          options={[
            { value: "cash", label: "Efectivo" },
            { value: "debitCard", label: "Tarjeta de débito" },
            { value: "creditCard", label: "Tarjeta de crédito" },
            { value: "MercadoPago", label: "Mercado pago" },
          ]}
        />
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            disabled={isLoading}
            type="button"
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Cancelar
          </button>
          <button disabled={isLoading} type="submit">
            Guardar
          </button>
        </div>
      </form>
      {isCreatingPatient && (
        <PatientModal
          isOpen={true}
          onClose={() => setIsCreatingPatient(false)}
        />
      )}
      {isCreatingService && (
        <ServiceModal
          isOpen={true}
          onClose={() => setIsCreatingService(false)}
        />
      )}
    </Modal>
  );
};

export default AppointmentModal;

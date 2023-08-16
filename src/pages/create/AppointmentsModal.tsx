import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import customMessage from "../../commons/customMessage";
import Modal from "../../commons/Modal";
import RHFDatePicker from "../../commons/DatePicker";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PatientModal from "./PatientModal";
import ServiceModal from "./ServiceModal";
import CustomSelect from "../../commons/Select";
import SelectAutocomplete from "../../commons/SelectAutocomplete";
import Input from "../../commons/Input";
import RHFTimePicker from "../../commons/TimePicker";

interface AppointmentModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [addressId, setAddressId] = useState("");
  const [serviceData, setServiceData] = useState("");
  const [addressData, setAddressData] = useState([]);
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      dateOfAppointment: "",
      timeOfAppointment: "",
      duration: "",
      patientId: "",
      doctorId: doctorId,
      address: "",
      serviceId: "",
      paymentMethod: "",
      servicePrice: "",
      appointmentPrice: "",
      currency: "ARS",
      category: "",
      type: "",
    },
  });

  const serviceId = watch("serviceId");
  const address = watch("address");

  const submitModal: SubmitHandler<FieldValues> = async (data) => {
    if (selectedService) {
      data.servicePrice = serviceData; // Update the price field with the serviceData
    }
    console.log(data, "Data!");
    try {
      setIsLoading(true);
      await axios.post(`http://localhost:3001/api/appointments/new`, data);
      customMessage("success", "Se creo una nueva cita.");
    } catch (error) {
      customMessage("error", "Algo salió mal.");
      console.error(error);
    }
    onClose();
    reset();
    setIsLoading(false);
  };

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3001/api/services/${serviceId}`)
      .then((res) => {
        setServiceData(res.data.data.price[0].price);
      })
      .catch((err) => console.log(err));
  };

  const fetchAddressData = async () => {
    await axios
      .get(`http://localhost:3001/api/address/doctor/${doctorId}`)
      .then((res) => {
        const addresses = res.data.data;
        const options = addresses.map((address) => ({
          value: address._id,
          label: `${address.addressName} - ${address.street} ${address.number}`,
        }));
        setAddressData(options);
      })
      .catch((err) => console.log(err));
  };

  const fetchAppointmentsData = async () => {
    await axios
      .get(`http://localhost:3001/api/address/${address}/allschedule`)
      .then((res) => {
        console.log(res.data.data, "Appointments");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    reset();
  }, [onClose]);

  useEffect(() => {
    if (selectedService) {
      console.log("activo address");
      fetchData();
    }
    return;
  }, [selectedService, serviceData]);

  useEffect(() => {
    if (address) {
      console.log("activo appointments");
      fetchAppointmentsData();
    }
    return;
  }, [address]);

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
            name="dateOfAppointment"
          />
          <RHFTimePicker
            label="Hora del turno"
            placeholder="Seleccione una hora"
            control={control}
            name="timeOfAppointment"
          />
          <RHFTimePicker
            label="Duracion del turno"
            placeholder="Seleccione una hora"
            control={control}
            name="duration"
          />
          <CustomSelect
            label="Consultorio"
            placeholder="Seleccione su consultorio"
            control={control}
            name="address"
            onClick={() => fetchAddressData()}
            options={addressData}
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
            name="patientId"
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
            name="serviceId"
          />
          <Input
            id="servicePrice"
            label="Importe del servicio"
            type="number"
            disabled
            value={serviceData}
            register={register}
            errors={errors}
          />
          <Input
            id="appointmentPrice"
            label="Importe final"
            type="number"
            register={register}
            errors={errors}
          />
        </div>
        <CustomSelect
          label="Metodo de pago"
          placeholder="Seleccione una opción de pago"
          control={control}
          name="paymentMethod"
          options={[
            { value: "Cash", label: "Efectivo" },
            { value: "DebitCard", label: "Tarjeta de débito" },
            { value: "CreditCard", label: "Tarjeta de crédito" },
            { value: "MercadoPago", label: "Mercado pago" },
          ]}
        />
        <CustomSelect
          label="Categoria"
          placeholder="Seleccione una opción..."
          control={control}
          name="category"
          options={[
            { value: "Without insurance", label: "Particular" },
            { value: "Union insurance", label: "Obra social" },
            { value: "Private insurance", label: "Prepaga" },
          ]}
        />
        <CustomSelect
          label="Modalidad"
          placeholder="Selecctione una opción..."
          control={control}
          name="type"
          options={[
            { value: "In office", label: "Consultorio" },
            { value: "Online", label: "Virtual" },
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
          type="CREATE"
        />
      )}
    </Modal>
  );
};

export default AppointmentModal;

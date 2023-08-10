import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import customMessage from "../../commons/customMessage";
import Modal from "../../commons/Modal";
import RHFDatePicker from "../../commons/DatePicker";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Select } from "antd";
const { Option } = Select;
import { UserOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import PatientModal from "./PatientModal";
import CustomSelect from "../../commons/Select";

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

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isCreatingPatient, setIsCreatingPatient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filtrar pacientes por nombre y apellido concatenados
    const filtered = patients
      .map((patient) => ({
        _id: patient._id,
        name: patient.name,
        lastName: patient.lastName,
        governmentId: patient.govermentId,
      }))
      .filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    console.log(filtered, "Filtrados");
    setFilteredPatients(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/users/patients/${doctorId}`
        );
        console.log(response.data.data, "Patients");
        setPatients(response.data.data); // Update state with response.data
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatients(); // Call the fetch function
  }, [doctorId]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      date: "",
      timeOfAppointment: "",
      patient: selectedPatient,
      doctor: doctorId,
      address: "",
      service: "",
      paymentMethod: "",
    },
  });

  const submitModal: SubmitHandler<FieldValues> = async (data) => {
    console.log(doctorId, "Doctor ID");
    console.log(data, "Datos enviados");
    try {
      customMessage("success", "Abrir la Consola");
      await axios.post(`http://localhost:3001/api/appointments/new`, data);
    } catch (error) {
      customMessage("error", "Algo salió mal.");
      console.error(error);
    }
    onClose();
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
          <Select
            onSearch={(value) => setSearchQuery(value)}
            onSelect={(value) => {
              if (value === "create") {
                return setIsCreatingPatient(true);
              }
              setSelectedPatient(value);
              console.log(value, "Selected Patient");
            }}
            showSearch
            optionFilterProp="children"
            filterOption={false}
            style={{ width: "100%" }}
            placeholder={
              patients.length > 3
                ? "Ingresar más de tres letras"
                : "Buscar paciente"
            }
          >
            {filteredPatients.length === 0 ? (
              <Option value="create">
                <PlusOutlined style={{ marginRight: "5px" }} />
                Crear nuevo paciente
              </Option>
            ) : (
              filteredPatients.slice(0, 5).map((patient) => (
                <Option key={patient._id} value={patient._id}>
                  <UserOutlined style={{ color: "blue", marginRight: "5px" }} />
                  {patient.name} {patient.lastName}
                </Option>
              ))
            )}
          </Select>
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
      </form>
      {isCreatingPatient && (
        <PatientModal
          isOpen={true}
          onClose={() => setIsCreatingPatient(false)}
        />
      )}
    </Modal>
  );
};

export default AppointmentModal;

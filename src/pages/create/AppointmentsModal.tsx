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

interface AppointmentModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

interface Patient {
  _id: string;
  name: string;
  lastName: string;
  // Agrega otras propiedades si es necesario
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  const handlePatientSearch = (searchQuery: string) => {
    const filtered = patients.filter((patient) =>
      (patient.name + " " + patient.lastName)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

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
      patient: "",
      doctor: doctorId,
      address: "",
      service: "",
      paymentMethod: "",
    },
  });

  const submitModal: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    console.log(doctorId, "Doctor ID");
    console.log(data, "Datos enviados");
    try {
      customMessage("success", "Abrir la Consola");
      await axios.post(`http://localhost:3001/api/appointments/new`, data);
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
        <p className="text-md font-semibold">Nuevo turno</p>
        <div className="flex bg-[#EEEFF4] rounded-md h-8 justify-start items-center">
          <p className="text-md p-4">Datos requeridos</p>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          <RHFDatePicker
            label="Fecha del turno"
            placeholder="Seleccione una fecha"
            control={control}
            name="date"
          />
          <Select
            showSearch
            placeholder="Seleccione un paciente"
            optionFilterProp="children"
            onChange={(value) => setSelectedPatient(value)}
            onSearch={(value) => handlePatientSearch(value)}
            filterOption={false}
            style={{ width: "100%" }}
          >
            {filteredPatients.map((patient) => (
              <Option key={patient._id} value={patient._id}>
                {patient.name} {patient.lastName}
              </Option>
            ))}
          </Select>
        </div>
      </form>
    </Modal>
  );
};

export default AppointmentModal;

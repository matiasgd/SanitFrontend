import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AutoComplete, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import clsx from "clsx";

interface SearchBarProps {
  patients: any[];
  appointments: any[];
}

const SearchBar: React.FC<SearchBarProps> = ({ patients, appointments }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedButton, setSelectedButton] = useState<string>("Pacientes");
  const navigate = useNavigate();

  const searchOptions = () => {
    if (selectedButton === "Pacientes") {
      return patients
        .filter((patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((patient) => ({
          text: patient._id,
          value: patient.name + " " + patient.lastName,
        }));
    } else if (selectedButton === "Consultas") {
      return appointments
        .filter((appointment) =>
          appointment.patient.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((appointment) => ({
          text:
            `[${moment(appointment.startTime).format(
              "YYYY-MM-DD"
            )}] Prestación: ${appointment.service.serviceName}` +
            " - Paciente: " +
            appointment.patient.lastName +
            ", " +
            appointment.patient.name,
          value:
            `[${moment(appointment.startTime).format(
              "YYYY-MM-DD"
            )}] Prestación: ${appointment.service.serviceName}` +
            " - Paciente: " +
            appointment.patient.lastName +
            ", " +
            appointment.patient.name,
        }));
    }
    return [];
  };

  function handleSelect(selectedValue: any) {
    const route = `/patient/${selectedValue}`;
    navigate(route);
  }

  return (
    <div className="flex justify-center items-center h-12 w-full rounded-full bg-gray-200">
      <SearchOutlined className="px-2 text-gray-600" />
      <AutoComplete
        className="w-full"
        options={searchOptions()
          .slice(0, 5)
          .map((option, index) => ({
            value: option.text,
            label: option.value,
            key: index.toString(),
          }))}
        placeholder="Busca un paciente, pago o consulta..."
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        onSelect={(selectedValue) => handleSelect(selectedValue)}
      />
      <div className="font-semibold ml-2">en:</div>
      <div className="flex bg-white rounded-full mx-2">
        <Button
          type="ghost"
          onClick={() => {
            setSelectedButton("Pacientes");
          }}
          className={clsx(
            `flex rounded-full text-black hover:text-blue-500 hover:font-semibold`,
            selectedButton === "Pacientes"
              ? "bg-blue-100 text-blue-500 font-semibold"
              : "bg-white"
          )}
        >
          Pacientes
        </Button>
        <Button
          type="link"
          onClick={() => {
            setSelectedButton("Consultas");
          }}
          className={clsx(
            `flex rounded-full text-black hover:text-blue-500 hover:font-semibold`,
            selectedButton === "Consultas"
              ? "bg-blue-100 text-blue-500 font-semibold"
              : "bg-white"
          )}
        >
          Consultas
        </Button>
        <Button
          type="link"
          onClick={() => {
            setSelectedButton("Pagos");
          }}
          className={clsx(
            `flex rounded-full text-black hover:text-blue-500 hover:font-semibold`,
            selectedButton === "Pagos"
              ? "bg-blue-100 text-blue-500 font-semibold"
              : "bg-white"
          )}
        >
          Pagos
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;

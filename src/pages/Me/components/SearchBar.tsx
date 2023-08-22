import React, { useState } from "react";
import { AutoComplete, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const SearchBarStyle = {
  display: "flex",
  alignItems: "center",
  height: "40px",
  width: "100%",
  borderRadius: "100px",
  backgroundColor: "#EEEFF4",
};

const ButtonStyle = {
  display: "flex",
  borderRadius: "50px",
  alignItems: "center",
  justifyContent: "center",
  width: "120px",
  height: "30px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const HoverButtonStyle = {
  backgroundColor: "#F2F7FD",
  color: "#5F8DCA",
};

interface SearchBarProps {
  patients: any[];
  appointments: any[];
}

const SearchBar: React.FC<SearchBarProps> = ({ patients, appointments }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedButton, setSelectedButton] = useState<string>("Pacientes");
  const navigate = useNavigate();

  const handleButtonSelect = (buttonName: string) => {
    setSelectedButton(buttonName === selectedButton ? null : buttonName);
  };

  const renderButton = (
    buttonName: string,
    backgroundColor: string,
    color: string
  ) => (
    <div
      style={{
        ...ButtonStyle,
        backgroundColor,
        color: selectedButton === buttonName ? color : "black",
      }}
      onClick={() => handleButtonSelect(buttonName)}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor =
          HoverButtonStyle.backgroundColor;
        e.currentTarget.style.color = HoverButtonStyle.color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = backgroundColor;
        e.currentTarget.style.color =
          selectedButton === buttonName ? color : "black";
      }}
    >
      {buttonName}
    </div>
  );

  const searchOptions = () => {
    if (selectedButton === "Pacientes") {
      // Filtra pacientes y crea un arreglo de objetos con las propiedades 'text' y 'value'
      return patients
        .filter((patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((patient) => ({
          text: patient._id,
          value: patient.name + " " + patient.lastName,
        }));
    } else if (selectedButton === "Consultas") {
      console.log("entre...");
      // Filtra consultas (appointments) y crea un arreglo de objetos con las propiedades 'text' y 'value'
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
    // Si no se ha seleccionado ningún filtro, devuelve un arreglo vacío
    return [];
  };

  function handleSelect(selectedValue) {
    const route = `/patient/${selectedValue}`;
    navigate(route);
  }

  return (
    <div style={SearchBarStyle}>
      <SearchOutlined style={{ marginLeft: "15px" }} />
      <AutoComplete
        style={{ width: "100%" }}
        options={searchOptions()
          .slice(0, 5)
          .map((option, index) => ({
            value: option.text,
            label: option.value,
            key: index.toString(),
          }))}
        placeholder="Encuentra la información que necesitas"
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        onSelect={(selectedValue) => handleSelect(selectedValue)}
      />
      <div>in:</div>
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          width: "400px",
          borderRadius: "50px",
          marginLeft: "10px",
          marginRight: "5px",
        }}
      >
        {renderButton(
          "Pacientes",
          selectedButton === "Pacientes" ? "#F2F7FD" : "white",
          "#5F8DCA"
        )}
        {renderButton(
          "Consultas",
          selectedButton === "Consultas" ? "F2F7FD" : "white",
          "#5F8DCA"
        )}
        {renderButton(
          "Pagos",
          selectedButton === "Pagos" ? "F2F7FD" : "white",
          "#5F8DCA"
        )}
      </div>
    </div>
  );
};

export default SearchBar;

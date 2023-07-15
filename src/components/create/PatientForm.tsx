import React, { useState } from "react";
import { AutoComplete, DatePicker, Input, Select } from "antd";
import moment from "moment";
import "moment/locale/es";
import { Option } from "antd/lib/mentions";
import AddressForm from "./AddressForm";
import Nationalities from "../../../public/nationalities";

const PatientForm = () => {
  const [patient, setPatient] = useState({
    name: "",
    lastName: "",
    govermentId: "",
    nationality: "",
    email: "",
    birthdate: null,
    gender: "",
    codCountry: "",
    codArea: "",
    cellphone: "",
    healthInsurance: "",
    healthInsuranceNumber: "",
    privateHealthInsurance: "",
    privateHealthInsuranceNumber: "",
    contactName: "",
    contactLastName: "",
    contactRelationship: "",
    contactPhone: "",
  });

  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    const filteredOptions = Nationalities.filter((nationality) =>
      nationality.toLowerCase().includes(value.toLowerCase())
    );
    setOptions(filteredOptions);
    setSearchText(value);
  };

  const onSelect = (value: string) => {
    setSearchText(value);
    setPatient((prevPatient) => ({
      ...prevPatient,
      nationality: value,
    }));
  };

  const genderOptions = [
    { value: "masculino", label: "Masculino" },
    { value: "femenino", label: "Femenino" },
    { value: "no-binario", label: "No binario" },
  ];

  const relationshipOptions = [
    { value: "padre", label: "Padre" },
    { value: "madre", label: "Madre" },
    { value: "abuelo/a", label: "Abuelo/a" },
    { value: "hermano/a", label: "Hermano/a" },
    { value: "hijo/a", label: "Hijo/a" },
    { value: "pareja", label: "Pareja" },
    { value: "amigo/a", label: "Amigo/a" },
    { value: "tio/a", label: "Tio/a" },
    { value: "otro", label: "Otro" },
  ];

  const handleInputChange = (name: string, value: string) => {
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const container = {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    alignItems: "center",
    borderRadius: "10px",
    height: "fit-content",
    backgroundColor: "white",
  };

  const header = {
    display: "flex",
    backgroundColor: "#EEEFF4",
    borderRadius: "5px",
    height: "35px",
    alignItems: "center",
  }

  const fieldStyle = {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  const labelStyle = { fontSize: "13px", color: "#888888" };

  const inputStyle = {
    width: "100%",
    border: "1px solid #CDCFD3",
    borderRadius: "5px",
    padding: "10px",
    height: "32.5px",
  };

  return (
    <div>
      <div style={container}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          <div
            style={header}
          >
            <p style={{ fontSize: "16px", padding: "15px" }}>Datos generales</p>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Nombre</label>
              <input
                id="name"
                name="name"
                value={patient.name}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Apellido</label>
              <input
                id="lastName"
                name="lastName"
                value={patient.lastName}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>DNI / ID</label>
              <input
                id="govermentId"
                name="govermentId"
                value={patient.govermentId}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Nacionalidad</label>
              <AutoComplete
                value={searchText}
                onChange={handleSearch}
                onSelect={onSelect}
                options={options.map((option) => ({ value: option }))}
              >
                <Input.Search placeholder="Buscar nacionalidad" />
              </AutoComplete>
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Género</label>
              <Select
                id="gender"
                name="gender"
                value={patient.gender}
                onChange={(value) => handleInputChange("gender", value)}
              >
                {genderOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Fecha de Nacimiento</label>
              <DatePicker
                id="birthdate"
                name="birthdate"
                value={patient.birthdate ? moment(patient.birthdate) : null}
                onChange={(date, dateString) =>
                  handleInputChange("birthdate", dateString)
                }
                style={inputStyle}
              />
            </div>
          </div>
          <div
            style={header}
          >
            <p style={{ fontSize: "16px", padding: "15px" }}>Contacto</p>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Celular</label>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  id="codCountry"
                  name="codCountry"
                  value={patient.codCountry}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  style={inputStyle}
                />
                <input
                  id="codArea"
                  name="codArea"
                  value={patient.codArea}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  style={inputStyle}
                />
                <input
                  id="cellphone"
                  name="cellphone"
                  value={patient.cellphone}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Email</label>
              <input
                id="email"
                name="email"
                value={patient.email}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>
          <div
            style={header}
          >
            <p style={{ fontSize: "16px", padding: "15px" }}>Seguro Médico</p>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Obra Social</label>
              <input
                id="healthInsurance"
                name="healthInsurance"
                value={patient.healthInsurance}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Número OOSS</label>
              <input
                id="healthInsuranceNumber"
                name="healthInsuranceNumber"
                value={patient.healthInsuranceNumber}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Prepaga</label>
              <input
                id="healthInsurance"
                name="healthInsurance"
                value={patient.healthInsurance}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Número PP</label>
              <input
                id="privateHealthInsurance"
                name="privateHealthInsurance"
                value={patient.privateHealthInsurance}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>
          <div
            style={header}
          >
            <p style={{ fontSize: "16px", padding: "15px" }}>Dirección</p>
          </div>
          <AddressForm />
          <div
            style={header}
          >
            <p style={{ fontSize: "16px", padding: "15px" }}>
              Contacto de emergencia
            </p>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Nombre Contacto</label>
              <input
                id="contactName"
                name="contactName"
                value={patient.contactName}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Apellido Contacto</label>
              <input
                id="contactLastName"
                name="contactLastName"
                value={patient.contactLastName}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Relación</label>
              <Select
                id="contactRelationship"
                name="contactRelationship"
                value={patient.contactRelationship}
                onChange={(value) => handleInputChange("gender", value)}
              >
                {relationshipOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Celular Contacto</label>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  id="contactPhone"
                  name="contactPhone"
                  value={patient.contactPhone}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;

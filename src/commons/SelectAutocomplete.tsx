import { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";
import { UserOutlined, PlusOutlined, HeartOutlined } from "@ant-design/icons";
import { Controller, Control } from "react-hook-form";

const { Option } = Select;

interface SelectAutocompleteProps {
  control: Control;
  doctorId: string;
  onSelect: (value: string) => void;
  label: string;
  createText: string;
  typeOfSearch?: "patients" | "services";
  name: string;
}

interface Patient {
  _id: string;
  name: string;
  lastName: string;
  govermentId: string;
}

interface Services {
  _id: string;
  serviceName: string;
}

interface FilteredPatients {
  _id: string;
  name: string;
  lastName: string;
}

interface FilteredServices {
  _id: string;
  name: string;
  lastName: string;
}

const SelectAutocomplete: React.FC<SelectAutocompleteProps> = ({
  control,
  doctorId,
  onSelect,
  label,
  createText,
  typeOfSearch,
  name,
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<FilteredPatients[]>(
    []
  );
  const [filteredServices, setFilteredServices] = useState<FilteredServices[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeOfSearch === "patients") {
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
      setFilteredPatients(filtered);
    } else if (typeOfSearch === "services") {
      // Filtrar servicios por nombre
      const filtered = services
        .map((service) => ({
          _id: service._id,
          name: service.serviceName,
          lastName: "",
        }))
        .filter((service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      setFilteredServices(filtered);
    }
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      if (typeOfSearch === "patients") {
        try {
          const patientsResponse = await axios.get(
            `${import.meta.env.VITE_API_ROUTE}api/users/${doctorId}/${typeOfSearch}`
          );
          setPatients(patientsResponse.data.data);
        } catch (error) {
          console.error(error);
        }
      } else if (typeOfSearch === "services") {
        try {
          const servicesResponse = await axios.get(
            `${import.meta.env.VITE_API_ROUTE}api/${typeOfSearch}/user/${doctorId}`
          );
          setServices(servicesResponse.data.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [doctorId]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <div className="mb-2">
              <label className="pl-4 pb-1 flex justify-start text-[13.5px]  text-gray-500 ">
                {label}
              </label>
              <Select
                {...field}
                onSearch={(value) => setSearchQuery(value)}
                onSelect={onSelect}
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
                {typeOfSearch === "patients" ? (
                  filteredPatients.length === 0 ? (
                    <Option value="create">
                      <PlusOutlined style={{ marginRight: "5px" }} />
                      {createText}
                    </Option>
                  ) : (
                    filteredPatients.slice(0, 5).map((patient) => (
                      <Option key={patient._id} value={patient._id}>
                        <UserOutlined
                          style={{ color: "blue", marginRight: "5px" }}
                        />
                        {patient.name} {patient.lastName}
                      </Option>
                    ))
                  )
                ) : filteredServices.length === 0 ? (
                  <Option value="create">
                    <PlusOutlined style={{ marginRight: "5px" }} />
                    {createText}
                  </Option>
                ) : (
                  filteredServices.slice(0, 3).map((service) => (
                    <Option
                      key={service._id}
                      value={service._id}
                      onclick={onSelect}
                    >
                      <HeartOutlined
                        style={{ color: "blue", marginRight: "5px" }}
                      />
                      {service.name}
                    </Option>
                  ))
                )}
              </Select>
            </div>
          </>
        )}
      />
    </>
  );
};

export default SelectAutocomplete;

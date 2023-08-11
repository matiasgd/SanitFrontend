import { useEffect, useState } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Controller, Control } from 'react-hook-form';

const { Option } = Select;

interface PatientAutocompleteProps {
  control: Control;
  doctorId: string;
  onSelect: (value: string) => void;
}

const PatientAutocomplete: React.FC<PatientAutocompleteProps> = ({ control, doctorId, onSelect }) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filtered = patients
      .map(patient => ({
        _id: patient._id,
        name: patient.name,
        lastName: patient.lastName,
        governmentId: patient.govermentId,
      }))
      .filter(
        patient =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredPatients(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/patients/${doctorId}`);
        setPatients(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatients();
  }, [doctorId]);

  return (
    <Controller
      name="patient"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          onSearch={(value) => setSearchQuery(value)}
          onSelect={onSelect}
          showSearch
          optionFilterProp="children"
          filterOption={false}
          style={{ width: "100%" }}
          placeholder={patients.length > 3 ? "Ingresar más de tres letras" : "Buscar paciente"}
        >
          {filteredPatients.length === 0 ? (
            <Option value="create">
              <PlusOutlined style={{ marginRight: "5px" }} />
              Crear nuevo paciente
            </Option>
          ) : (
            filteredPatients.slice(0, 5).map(patient => (
              <Option key={patient._id} value={patient._id}>
                <UserOutlined style={{ color: "blue", marginRight: "5px" }} />
                {patient.name} {patient.lastName}
              </Option>
            ))
          )}
        </Select>
      )}
    />
  );
};

export default PatientAutocomplete;

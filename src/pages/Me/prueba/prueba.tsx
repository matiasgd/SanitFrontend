import React, { useState, useEffect } from "react";
import { defaultPatients } from "../../../constans/defaultPatients";
import { Input, Dropdown, Menu } from "antd";
import { UserOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";

interface Patient {
  id: number;
  name: string;
  surname: string;
  dni: string; // Agregamos el DNI
  // ... otros campos del paciente
}

const splitNameByMatch = (name: string, query: string) => {
  const start = name.toLowerCase().indexOf(query.toLowerCase());
  if (start === -1) return [name];

  const end = start + query.length;
  return [
    name.substring(0, start), // Antes de la coincidencia
    name.substring(start, end), // La coincidencia
    name.substring(end), // Después de la coincidencia
  ];
};

const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    if (inputValue.length < 3) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    const searchPatients = () => {
      const filteredPatients = defaultPatients.filter((patient) =>
        patient.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setResults(filteredPatients.slice(0, 5));
      setIsLoading(false);
    };

    setIsLoading(true);

    const timerId = setTimeout(searchPatients, 500); // Debouncing

    return () => clearTimeout(timerId); // Clear timeout if user types again before timer ends
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" && selectedIndex < results.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (e.key === "ArrowUp" && selectedIndex > -1) {
      setSelectedIndex(selectedIndex - 1);
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      // Implement a function to handle the selection
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <PlusOutlined style={{ marginRight: "5px" }} />
        Crear paciente
      </Menu.Item>
      {results.map((patient, index) => {
        const [beforeMatch, match, afterMatch] = splitNameByMatch(
          patient.name,
          inputValue
        );
        return (
          <Menu.Item
            key={patient.id}
            className={index === selectedIndex ? "selected" : ""}
          >
            <UserOutlined style={{ color: "blue", marginRight: "5px" }} />
            {beforeMatch}
            <strong>{match}</strong>
            {afterMatch} {patient.surname}
            <span style={{ color: 'grey', fontSize: '0.8em', marginLeft: '5px' }}>- ID: {patient.dni}</span>
          </Menu.Item>
        );
      })}
      {results.length === 0 && (
        <Menu.Item disabled>No se encontraron resultados</Menu.Item>
      )}
      {results.length > 0 && ( // Condición para mostrar el ítem sólo si hay resultados
        <Menu.Item>
          <SearchOutlined style={{ marginRight: "5px" }} />
          Ver todos los resultados
        </Menu.Item>
      )}
    </Menu>
  );
  
  return (
    <div onKeyDown={handleKeyDown}>
      <Dropdown overlay={menu} visible={inputValue.length >= 3}>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedIndex(-1); // Reset selected index on input change
          }}
          placeholder={
            inputValue.length < 3
              ? "Ingresar más de tres letras"
              : "Buscar paciente"
          }
          prefix={<SearchOutlined />} // Añadimos la lupa al inicio del Input
        />
      </Dropdown>
      {isLoading && <span>Loading...</span>}
    </div>
  );
};

export default SearchInput;

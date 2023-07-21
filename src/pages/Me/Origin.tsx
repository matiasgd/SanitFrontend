import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Patient from "./components/Patient"; 
import ClinicalHistory from "./components/ClinicalHistory"; // Importa el componente específico 2

const Origin = () => {
  const [selectedComponent, setSelectedComponent] = useState("Patient");

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div style={{ display: "flex", height:"100vh", padding: "20px", gap: "5px" }}>
      <div>
        <Sidebar onSelect={handleComponentSelect} />
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        {selectedComponent === "Pacientes" && <Patient />}
        {selectedComponent === "ClinicalHistory" && <ClinicalHistory />}
      </div>
    </div>
  );
};

export default Origin;
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Patients from "./components/Patients"; 
import Patient from "./Home"; 
import ClinicalHistory from "./components/ClinicalHistory"; // Importa el componente específico 2
import Modal from "../create/ModalTest"; 
import Wallet from "../Wallet/Wallet";
import Calendar from "../Calendar/Calendar";

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
        {selectedComponent === "Pacientes" && <Patients />}
        {selectedComponent === "ClinicalHistory" && <ClinicalHistory />}
        {selectedComponent === "Modales" && <Modal />}
        {selectedComponent === "Ingresos" && <Wallet />}
        {selectedComponent === "Turnos" && <Calendar />}
        {selectedComponent === "Panel" && <Patient />}
      </div>
    </div>
  );
};

export default Origin;

import React from "react";
import MetricBox from "./MetricBox";

interface Appointments {
  appointmentDate: string;
  patientName: string;
  serviceName: string;
  appointmentPrice: string;
  category: string;
  status: string;
}

interface KeypadTableProps {
  appointments: Appointments[];
}

const Keypad: React.FC<KeypadTableProps> = ({ appointments }) => {
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "15px",
      }}
    >
      <MetricBox
        title="Consultas cargadas "
        metric={appointments.length}
        color="#F2F7FD"
        currency=""
      />
    </div>
  );
};

export default Keypad;

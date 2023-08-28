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
    <div>
      <MetricBox
        title="Consultas Totales"
        metric={appointments.length}
        currency=""
      />
    </div>
  );
};

export default Keypad;

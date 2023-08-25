import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MetricBox from "./MetricBox";
import axios from "axios";

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
  const doctorId = useSelector((state: RootState) => state.user.id);
  
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

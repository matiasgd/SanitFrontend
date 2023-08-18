import React from "react";
import { useState } from "react";
import { Button, Tag } from "antd";
import AppointmentsModal from "../../create/AppointmentsModal";

const Patient: React.FC = () => {
  // modales
  const [isOpenAppointmentsModal, setIsOpenAppointmentsModal] = useState(false);

  const buttonStyle = {
    backgroundColor: "#F9F9F9",
    color: "#000000",
    borderRadius: "5px",
    fontSize: "12px",
  };

  const appointmentContentStyle = {
    fontSize: "12px",
  };

  const appointments = [
    {
      id: 1,
      date: "23/8/2020",
      hour: "18:30",
      type: "virtual",
      status: "pending",
      medicalNotes: "fue una muy bella sesión",
      medicalPlan: "le haré ver la niñera",
    },
    {
      id: 2,
      date: "27/8/2020",
      hour: "12:30",
      type: "presencial",
      status: "payed",
      medicalNotes: "viene medio mal con la vieja",
      medicalPlan: "recomendé tatuarse la nalga",
    },
    {
      id: 3,
      date: "27/10/2020",
      hour: "4:30",
      type: "a domicilio",
      status: "payed",
      medicalNotes: "llamada de emergencia",
      medicalPlan: "le dije que se tome un vino y se relaje",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        borderRadius: "15px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        flexDirection: "column",
      }}
    >
      <AppointmentsModal
        isOpen={isOpenAppointmentsModal}
        onClose={() => setIsOpenAppointmentsModal(false)}
      />
      <div
        style={{
          display: "flex",
          padding: "10px 20px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#EEEFF4",
        }}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "end" }}>
          <strong style={{ color: "Black" }}>Consultas</strong>
        </div>
        <Button
          onClick={() => setIsOpenAppointmentsModal(true)}
          style={buttonStyle}
        >
          + Nueva Consultas
        </Button>
      </div>
      <div
        style={{
          padding: "10px 20px",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          height: "auto",
        }}
      >
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            style={{ padding: "10px", borderBottom: "1px solid #EEEFF4" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {appointment.date} - {appointment.type}
              <Tag color={appointment.status === "pending" ? "red" : "blue"}>
                {appointment.status}
              </Tag>
            </div>
            <div style={appointmentContentStyle}>
              <div>
                notes: {appointment.medicalNotes}
                <br></br>
                plan: {appointment.medicalPlan} <br></br>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patient;

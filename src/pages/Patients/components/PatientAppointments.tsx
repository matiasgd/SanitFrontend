import React from "react";
import { useState } from "react";
import { Button, Tag } from "antd";
import AppointmentsModal from "../../create/AppointmentsModal";

interface patientAppointmentsProps {
  appointments: any[];
}

const PatientAppointments: React.FC<patientAppointmentsProps> = ({
  appointments,
}) => {
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
          + Nueva consulta
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
            key={appointment._id} // Usamos _id como clave en lugar de id
            style={{ padding: "10px", borderBottom: "1px solid #EEEFF4" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {new Date(appointment.startTime).toLocaleDateString()} -{" "}
              {appointment.type === "In office" ? "Presencial" : "Virtual"}
              <Tag
                color={appointment.status === "Completed" ? "blue" : "red"} // Cambiamos los colores
              >
                {appointment.status === "Completed"
                  ? "Atendido"
                  : "No atendido"}
              </Tag>
              <Tag
                color={
                  appointment.paymentStatus === "Completed" ? "blue" : "red"
                } // Cambiamos los colores
              >
                {appointment.paymentStatus === "Completed"
                  ? "Pagado"
                  : "Pendiente"}
              </Tag>
            </div>
            <div style={appointmentContentStyle}>
              <div>
                {/* Tipo de servicio: {` ${appointment.service.serviceName}`} */}
                <br></br>
                Seguro:{" "}
                {appointment.category === "Without insurance"
                  ? "Particular"
                  : appointment.category === "Private Insurance"
                  ? "Prepaga"
                  : appointment.category === "Union Insurance"
                  ? "Obra social"
                  : appointment.category}{" "}
                <br></br>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAppointments;

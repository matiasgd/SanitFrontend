import React from "react";

interface patientProps {
  patient: any;
}

const Patient: React.FC<patientProps> = ({ patient }) => {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "15px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        flexDirection: "column",
      }}
    >
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
          <strong style={{ color: "Black" }}>
            {patient.name + " " + patient.lastName}
          </strong>
          <p style={{ color: "blue", fontSize: "12px" }}>
            Próximo turno - Vie, 16 de julio del 2023 (1 mes y 14 días)
          </p>
        </div>

        <div
          style={{
            backgroundColor: "green",
            borderRadius: "50%",
            width: "10px",
            height: "10px",
          }}
        ></div>
      </div>
      <div
        style={{
          padding: "20px",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          height: "80px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "12px", color: "#888888" }}>Celular</p>
            <p>{patient.cellphone}</p>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#888888" }}>Email</p>
            <p>{patient.email}</p>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#888888" }}>Dirección</p>
            <p>
              {patient.street + " " + patient.streetNumber}, {patient.city}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#888888" }}>Prestador</p>
            <p>{patient.privateHealthInsurance}</p>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#888888" }}>Numbero</p>
            <p>{patient.privateHealthInsuranceNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;

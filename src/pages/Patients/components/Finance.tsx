import React, { useState } from "react";
import Field from "../../../commons/Field";

interface FinanceComponentProps {
  //   sessionCount: number;
  //   subscribedThisMonth: number;
  //   attendancePercentage: number;
  //   patientDebt: number;
  //   paymentCycle: number;
  //   consultationPrice: number;
}

const FinanceComponent: React.FC<FinanceComponentProps> = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleContent = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#EEEFF4",
          cursor: "pointer",
          height: "35px",
          padding: "10px",
          borderRadius: "5px",
        }}
        onClick={toggleContent}
      >
        Finance {expanded ? "▼" : "▲"}
      </h2>
      {expanded && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "50%", padding: "10px" }}>
            <Field title={"Cantidad de sesiones"} value={8} edit={true} />
            <Field title={"Valor de consulta"} value={4500} edit={true} />
            <Field title={"% de inasistencias"} value={15} />
          </div>
          <div style={{ width: "50%", padding: "10px" }}>
            <Field
              title={"Inasistencias"}
              value={1}
              edit={true}
              aclaration="(12% debajo)"
              aclarationColor="green"
            />
            <Field title={"Deuda del paciente"} value={3000} edit={true} />
            <Field title={"% de inasistencias"} value={4} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceComponent;

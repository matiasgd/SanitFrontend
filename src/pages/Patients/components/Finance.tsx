import React, { useState } from "react";
import Field from "../../../commons/Field";

interface financeComponentProps {
  appointments: any;
}

const FinanceComponent: React.FC<financeComponentProps> = ({
  appointments,
}) => {
  const [expanded, setExpanded] = useState(true);

  const toggleContent = () => {
    setExpanded(!expanded);
  };

  function formatNumberWithCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function getSales() {
    let sales = 0;
    appointments.forEach((appointment: any) => {
      if (appointment.status === "Completed") {
        sales += appointment.appointmentPrice;
      }
    });
    return sales;
  }

  function getPayments() {
    let payments = 0;
    appointments.forEach((appointment: any) => {
      if (
        appointment.status === "Completed" &&
        appointment.paymentStatus === "Completed"
      ) {
        payments += appointment.appointmentPrice;
      } else if (
        appointment.status === "Completed" &&
        appointment.paymentStatus === "Partial"
      ) {
        payments += appointment.partialPayment;
      }
    });
    return payments;
  }

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
        Estado del paciente {expanded ? "▼" : "▲"}
      </h2>
      {expanded && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "50%", padding: "10px" }}>
            <Field
              title={"Cantidad de sesiones"}
              value={appointments.length}
              edit={true}
            />
            <Field
              title={"% de inasistencias"}
              value={
                appointments.filter(
                  (appointment: any) => appointment.status === "Skipped"
                ).length === 0
                  ? "0%"
                  : appointments.filter(
                      (appointment: any) => appointment.status === "Skipped"
                    ).length / appointments.length
              }
            />
            <Field
              title={"Facturación total"}
              value={`ARS ${formatNumberWithCommas(getSales())}`}
              edit={true}
            />
          </div>
          <div style={{ width: "50%", padding: "10px" }}>
            <Field
              title={"Inasistencias"}
              value={
                appointments.filter(
                  (appointment: any) => appointment.status === "Skipped"
                ).length
              }
              edit={true}
              aclarationColor="green"
            />
            <Field
              title={"Pagos del paciente"}
              value={`ARS ${formatNumberWithCommas(getPayments())}`}
              edit={true}
            />
            <Field
              title={"Pagos pendientes"}
              value={`ARS ${formatNumberWithCommas(
                getSales() - getPayments()
              )}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceComponent;

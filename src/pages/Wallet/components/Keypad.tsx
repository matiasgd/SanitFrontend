import React from "react";
import MetricBox from "./MetricBox";

const Keypad: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "15px",
      }}
    >
      <MetricBox
        title="Ingresos"
        metric="252.000"
        color="#F2F7FD"
        currency="$"
      />
      <MetricBox
        title="Estimado en USD"
        metric="490"
        color="#EEEFF4"
        currency="USD"
      />
      <MetricBox
        title="Tipo de cambio"
        metric="490"
        color="#EEEFF4"
        currency="USD"
      />
      <MetricBox
        title="Pagos recibidos"
        metric="21"
        color="#F2F7FD"
        currency=""
      />
      <MetricBox
        title="Pagos pendientes"
        metric="17.000"
        color="#FFFFC5"
        currency="$"
      />
    </div>
  );
};

export default Keypad;

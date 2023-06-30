import React from "react";
import defaultPatients from "../../../public/defaultPatients.tsx";

const Patient: React.FC = () => {
  return (
    <div
      style={{
        borderRadius: "15px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        width: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "10px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          justifyContent: "space-between",
          alignItems:"center"
        }}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "end" }}>
          <strong style={{ color: "Black" }}>Javier Lema</strong>
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
          backgroundColor: "#EEEFF4",
          padding: "10px",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          height: "100px",
          paddingTop: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "30px" }}>
          <div>
            <p style={{ fontSize: "12px", color: "#888888" }}>Email</p>
            <p>{defaultPatients[1].email}</p>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#888888" }}>Address</p>
            <p>
              {defaultPatients[1].address}, {defaultPatients[1].province}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#888888" }}>Type</p>
            <p>Prepaga</p>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#888888" }}>Insurance</p>
            <p>{defaultPatients[1].healthInsurance}</p>
          </div>
          <div>
            <p style={{ fontSize: "12px", color: "#888888" }}>Number</p>
            <p>{defaultPatients[1].insuranceNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;

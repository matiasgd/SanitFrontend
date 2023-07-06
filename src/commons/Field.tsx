import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

interface FieldProps {
  value: number;
  title: string;
  edit?: boolean;
  aclaration?: string;
  aclarationColor?: string;
}

const Field: React.FC<FieldProps> = ({ value, title, edit, aclaration, aclarationColor }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditClick = () => {
    setModalOpen(true);
  };

  return (
    <div style={{ marginTop: "3px" }}>
      <p style={{ fontSize: "12px", color: "#888888" }}>{title}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{display: "flex", gap:"10px", alignItems: "flex-end"}}>
          <p>{value}</p>
          <p style={{ marginRight: "5px", fontSize:"12px", color:`${aclarationColor}` }}>{aclaration}</p>
        </div>
        <div>
          {edit && (
            <div
              style={{ cursor: "pointer" }}
              onClick={handleEditClick}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "blue";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "initial";
              }}
            >
              <EditOutlined />
            </div>
          )}
          {modalOpen && (
            // Aquí puedes colocar el componente Modal que se abrirá al hacer clic en el lápiz
            <div>Modal</div>
          )}
        </div>
      </div>
      <hr style={{ marginTop: "3px", borderTop: "1px solid #EEEFF4" }} />
    </div>
  );
};

export default Field;

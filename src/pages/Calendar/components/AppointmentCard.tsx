import React, { useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";

const container = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  height: "70px",
  border: "1px solid #3B6FB6",
  borderRadius: "20px",
};

const colorBox = {
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#E7EFFA",
  color: "#3B6FB6",
  gap: "20px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px 0 0 20px",
  height: "100%",
  width: "30%",
  minWidth: "100px",
  padding: "10px",
};

const boxStyle = {
  paddingLeft: "20px",
};

const hourStyle = { lineHeight: "1", textAlign: "center" };

const titleStyle = { color: "#222323", fontWeight: "bold" };

const subTitleStyle = { color: "#707070", fontSize: "smaller" };

interface AppointmentCardProps {
  startTime: string;
  endTime: string;
  title: string;
  subtitle: string;
  circleColor: string;
  onClick: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  startTime,
  endTime,
  title,
  subtitle,
  circleColor,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    ...container,
    boxShadow: isHovered ? "0 0 10px rgba(0, 0, 250, 0.3)" : "none",
    cursor: "pointer",
  };

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "edit":
        // Lógica para editar
        break;
      case "delete":
        // Lógica para eliminar
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={colorBox}>
        <div style={{ justifyContent: "space-between" }}>
          <div
            style={{
              backgroundColor: circleColor,
              borderRadius: "100%",
              height: "18px",
              width: "18px",
              border: "2px solid white",
            }}
          ></div>
        </div>
        <div>
          <div style={hourStyle}>
            {startTime} - {endTime}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "70%",
        }}
      >
        <div style={boxStyle}>
          <div style={titleStyle}>{title}</div>
          <div style={subTitleStyle}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;

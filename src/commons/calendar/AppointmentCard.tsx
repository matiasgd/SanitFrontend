import React, { useState } from "react";

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
  margin: "20px",
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
    transform: isHovered ? "scale(1.02)" : "scale(1)",
    boxShadow: isHovered ? "0 0 10px rgba(231, 200, 250, 0.3)" : "none",
    cursor: "pointer",
    
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={colorBox}>
        <div>
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
      <div style={boxStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={subTitleStyle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default AppointmentCard;

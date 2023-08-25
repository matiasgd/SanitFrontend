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
  paddingLeft: "20px",
  paddingRight: "20px",
};

const hourStyle = { lineHeight: "1", textAlign: "center" };

const titleStyle = { color: "#222323", fontWeight: "bold" };

interface ServiceCardProps {
  serviceName: string;
  price: any;
  createdAt: string;
  circleColor: string;
  onClick: () => void;
}

function formatNumberWithCommas(value: Number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  serviceName,
  price,
  createdAt,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    ...container,
    boxShadow: isHovered ? "0 0 10px rgba(0, 0, 250, 0.3)" : "none",
    cursor: "pointer",
  };

  return (
    <>
      <div
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div style={colorBox}>
          <div style={{ justifyContent: "space-between" }}></div>
          <div>
            <div
              className="flex justify-center items-center text-sm font-bold"
              style={hourStyle}
            >
              {createdAt}
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
            <div
              className="flex justify-center items-center text-sm font-bold"
              style={titleStyle}
            >
              {serviceName}
            </div>
          </div>
          <div
            className="flex justify-center items-center text-sm font-bold"
            style={boxStyle}
          >
            <div>
              ARS {formatNumberWithCommas(price[price.length - 1].price)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;

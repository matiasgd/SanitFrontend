import React from "react";

interface MetricBoxProps {
  title: string;
  metric: number | string;
  color: string;
  currency?: string;
}

const MetricBox: React.FC<MetricBoxProps> = ({
  title,
  metric,
  color,
  currency,
}) => {
  const boxStyle: React.CSSProperties = {
    backgroundColor: color,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: "10px",
    display: "inline-block",
    borderRadius: "7.5px",
    minWidth: "175px",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "16px",
    color: "gray",
  };

  const metricStyle = {
    fontWeight: "bold",
    fontSize: "25px",
  };

  return (
    <div style={boxStyle}>
      <p style={metricStyle}>{`${currency} ${metric}`}</p>
      <h2 style={titleStyle}>{title}</h2>
    </div>
  );
};

export default MetricBox;

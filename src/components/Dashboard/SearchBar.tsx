import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBarStyle = {
  display: "flex",
  alignItems: "center",
  margin: "20px 20px 0px 5px",
  height: "40px",
  width: "100%",
  borderRadius: "100px",
  backgroundColor: "#EEEFF4",
};

const ButtonStyle = {
  display: "flex",
  borderRadius: "50px",
  alignItems: "center",
  justifyContent: "center",
  width: "120px",
  height: "30px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const HoverButtonStyle = {
  backgroundColor: "#F2F7FD",
  color: "#5F8DCA",
};

const SearchBar: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(
    "All Patients"
  );

  const handleButtonSelect = (buttonName: string) => {
    setSelectedButton(buttonName === selectedButton ? null : buttonName);
  };

  const renderButton = (
    buttonName: string,
    backgroundColor: string,
    color: string
  ) => (
    <div
      style={{
        ...ButtonStyle,
        backgroundColor,
        color: selectedButton === buttonName ? color : "black",
      }}
      onClick={() => handleButtonSelect(buttonName)}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor =
          HoverButtonStyle.backgroundColor;
        e.currentTarget.style.color = HoverButtonStyle.color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = backgroundColor;
        e.currentTarget.style.color =
          selectedButton === buttonName ? color : "black";
      }}
    >
      {buttonName}
    </div>
  );

  return (
    <div style={SearchBarStyle}>
      <SearchOutlined style={{ marginLeft: "15px" }} />
      <Input placeholder="Search" bordered={false} />
      <div>in:</div>
      <div
        style={{
          display: "flex",
          backgroundColor: "white",
          width: "400px",
          borderRadius: "50px",
          marginLeft: "10px",
          marginRight: "5px",
        }}
      >
        {renderButton(
          "All Patients",
          selectedButton === "All Patients" ? "#F2F7FD" : "white",
          "#5F8DCA"
        )}
        {renderButton(
          "Prescriptions",
          selectedButton === "Prescriptions" ? "F2F7FD" : "white",
          "#5F8DCA"
        )}
        {renderButton(
          "Test Results",
          selectedButton === "Test Results" ? "F2F7FD" : "white",
          "#5F8DCA"
        )}
      </div>
    </div>
  );
};

export default SearchBar;

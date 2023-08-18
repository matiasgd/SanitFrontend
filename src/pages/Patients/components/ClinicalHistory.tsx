import { useState } from "react";
import Finance from "./Finance";

const ClinicalHistory = () => {
  const [selectedButton, setSelectedButton] = useState("general");

  const ButtonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "130px",
    height: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    backgroundColor: "",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    padding: "10px",
    border: "1px solid #CDCFD3",
    borderBottom: "none",
    boxShadow: "1px 0px 2px rgba(0, 0, 0, 0.2)",
  };

  const ButtonHoverStyle = {
    ...ButtonStyle,
    backgroundColor: "#DCEAFB",
    color: "#5F8DCA",
    border: "none",
  };

  const handleClick = (button: any) => {
    setSelectedButton(button);
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={selectedButton === "general" ? ButtonHoverStyle : ButtonStyle}
          onClick={() => handleClick("general")}
        >
          General
        </div>
        <div
          style={selectedButton === "clinical" ? ButtonHoverStyle : ButtonStyle}
          onClick={() => handleClick("clinical")}
        >
          Historia
        </div>
        <div
          style={selectedButton === "recipes" ? ButtonHoverStyle : ButtonStyle}
          onClick={() => handleClick("recipes")}
        >
          Recetas
        </div>
        <div
          style={selectedButton === "studies" ? ButtonHoverStyle : ButtonStyle}
          onClick={() => handleClick("studies")}
        >
          Pagos
        </div>
      </div>
      <div
        style={{
          backgroundColor: "",
          borderRadius: "0 20px 20px 20px",
          marginBottom: "20px",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          height: "470px",
        }}
      >
        {selectedButton === "general" && (
          <div>
            <Finance />
          </div>
        )}
        {selectedButton === "clinical" && <div>Informacion clinica</div>}
        {selectedButton === "recipes" && <p>Recipes content</p>}
        {selectedButton === "studies" && <p>Studies content</p>}
      </div>
    </div>
  );
};

export default ClinicalHistory;

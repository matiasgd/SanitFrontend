import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";

const initialFormData = {
  name: "",
  education: "",
};

const Stepper: React.FC = () => {
  // States
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const { token } = theme.useToken();
  // Handlers
  const handleInputChange = (name: string, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const stepContents = [
    {
      title: "Datos Personales",
      content: (
        <div>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {/* Add other inputs for this step */}
        </div>
      ),
    },
    {
      title: "Estudios y Experiencia",
      content: (
        <div>
          <input
            type="text"
            name="education"
            value={formData.education || ""}
            onChange={(e) => handleInputChange("education", e.target.value)}
          />
          {/* Add other inputs for this step */}
        </div>
      ),
    },
    // Add other steps here
  ];
  const items = stepContents.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  // Controls
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{stepContents[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < stepContents.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === stepContents.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default Stepper;

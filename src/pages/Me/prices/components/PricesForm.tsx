import React, { useState } from "react";
import { Form, DatePicker, Input, Select } from "antd";

const { Option } = Select;

const fieldStyle = {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const fullfieldStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const labelStyle = { fontSize: "13px", color: "#888888" };

const PricesForm: React.FC = () => {
  const [duration, setDuration] = useState<string>("30Dias"); 
  const [fromDate, setFromDate] = useState<Date | null>(null); 
  const [toDate, setToDate] = useState<Date | null>(null); 

  const handleDurationChange = (value: string) => {
    setDuration(value);

    if (value === "15Dias" && fromDate) {
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + 15);
      setToDate(toDate);
    } else if (value === "30Dias" && fromDate) {
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + 30);
      setToDate(toDate);
    } else if (value === "45Dias" && fromDate) {
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + 45);
      setToDate(toDate);
    } else if (value === "60Dias" && fromDate) {
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + 60);
      setToDate(toDate);
    } else if (value === "120Dias" && fromDate) {
      const toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + 120);
      setToDate(toDate);
    } else if (value === "1Año" && fromDate) {
      const toDate = new Date(fromDate);
      toDate.setFullYear(toDate.getFullYear() + 1);
      setToDate(toDate);
    } else {
      setToDate(null);
    }
  };


  return (
    <Form
      layout="inline"
      style={{ display: "flex", flexDirection: "column", gap: "15px" }}
    >
      <div style={fullfieldStyle}>
        <h3 style={labelStyle}>Duración</h3>
        <Select value={duration} onChange={handleDurationChange}>
          <Option value="15Dias">15 Dias</Option>
          <Option value="30Dias">30 Dias</Option>
          <Option value="45Dias">45 Dias</Option> {/* Corrected value */}
          <Option value="60Dias">60 Dias</Option>
          <Option value="120Dias">120 Dias</Option>
          <Option value="1Año">1 Año</Option>
          <Option value="personalizado">Personalizado</Option>
        </Select>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ display: "flex", width: "100%", gap: "15px" }}>
          <div style={fieldStyle}>
            <h3 style={labelStyle}>Desde</h3>
            <DatePicker
              value={fromDate}
              onChange={(date) => setFromDate(date)}
            />
          </div>
          <div style={fieldStyle}>
            <h3 style={labelStyle}>Hasta</h3>
            <DatePicker
              value={toDate}
              disabled={!toDate} // Disable "Hasta" date field if toDate is null
            />
          </div>
        </div>
      </div>
      <div style={fullfieldStyle}>
        <h3 style={labelStyle}>Valor</h3>
        <Input min={0} />
      </div>
    </Form>
  );
};

export default PricesForm;

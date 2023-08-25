import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";

interface DateRangePickerProps {
  onDateRangeChange: (from: Date, to: Date) => void;
}

const styleBar = {
  height: "40px",
  display: "flex",
  backgroundColor: "#EEEFF4",
  gap: "20px",
  padding: "0px 20px",
  borderRadius: "7.5px",
  alignItems: "center",
  justifyContent: "space-between",
};

const stylePicker = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const styleInput = {
  maxWidth: "150px",
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onDateRangeChange,
}) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<string>("This Week");

  const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setFromDate(date);
    onDateRangeChange(date, toDate);
  };

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setToDate(date);
    onDateRangeChange(fromDate, date);
  };

  return (
    <div style={styleBar}>
      <div style={stylePicker}>
        <label htmlFor="fromDate">From</label>
        <Input
          type="date"
          id="fromDate"
          onChange={handleFromChange}
          style={styleInput}
        />
      </div>
      <div style={stylePicker}>
        <label htmlFor="toDate">To</label>
        <Input
          type="date"
          id="toDate"
          onChange={handleToChange}
          style={styleInput}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;

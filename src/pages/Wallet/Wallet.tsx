import React from "react";
import IncomeTable from "./components/IncomeTable";
import Sidebar from "../Me/Sidebar";
import Keypad from "./components/Keypad";
import DateRangePicker from "./components/DataRangePicker";
import { Button } from "antd";
import { payments } from "../../constans/defaultPayments";

const Wallet: React.FC = () => {
  return (
    <div style={{ display: "flex", margin: "20px", gap: "20px" }}>
      <div style={{ width: "10%", minWidth: "200px" }}>
        <Sidebar />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "70%" }}>
            <Keypad />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              margin: "20px",
            }}
          >
            <DateRangePicker />
            <Button>(+) New Income</Button>
          </div>
        </div>
        <div>
          <IncomeTable incomes={payments} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;

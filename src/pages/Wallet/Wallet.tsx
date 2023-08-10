import React from "react";
import IncomeTable from "./components/IncomeTable";
import Keypad from "./components/Keypad";
import DateRangePicker from "./components/DataRangePicker";
import { Button } from "antd";
import { payments } from "../../constans/defaultPayments";
import Sidebar from "../Me/Sidebar";

const Wallet: React.FC = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div style={{ display: "flex", margin: "20px", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
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
    </div>
  );
};

export default Wallet;

import React from "react";
import IncomeTable from "./components/IncomeTable";
import Keypad from "./components/Keypad";
import DateRangePicker from "./components/DataRangePicker";
import { Button } from "antd";
import { payments } from "../../constans/defaultPayments";
import Sidebar from "../Me/Sidebar";

const Wallet: React.FC = () => {
  return (
    <div className="flex w-full p-4">
      <Sidebar />
      <div className="flex p-4 w-full">
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
            <div className="flex flex-col gap-5 p-4 align-center justify-center w-1/3 bg-gray-100 rounded-xl">
              <DateRangePicker />
              <Button>(+) New Income</Button>
            </div>
          </div>
          <div className="p-4">
            <IncomeTable incomes={payments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

import React from "react";
import IncomeTable from "./IncomeTable";
import Sidebar from "../Dashboard/Sidebar";
import Keypad from "./Keypad";
import defaultPayments from "../../../public/defaultPayments";
import SearchBar from "../Dashboard/SearchBar";
import DateRangePicker from "./DataRangePicker";
import { Button } from "antd";

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
            <Button>
              (+) New Income
            </Button>
          </div>
        </div>
        <div>
          <IncomeTable incomes={defaultPayments} />
        </div>
      </div>
    </div>
  );
};

export default Wallet;

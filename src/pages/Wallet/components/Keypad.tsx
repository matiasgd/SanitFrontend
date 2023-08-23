import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MetricBox from "./MetricBox";
import axios from "axios";

interface Income {
  date: string;
  patient: string;
  services: Array<string>;
  method: string;
  amount: number;
  amountUSD: number;
}

interface KeypadTableProps {
  incomes: Income[];
}

const Keypad: React.FC<KeypadTableProps> = ({ incomes }) => {
  const doctorId = useSelector((state: RootState) => state.user.id);
  const [pendingPayments, setPendingPayments] = useState([]);
  const totalAmount = incomes.reduce((total, entry) => total + entry.amount, 0);
  const totalAmountUSD = incomes.reduce(
    (total, entry) => total + (entry.amountUSD ? entry.amountUSD : 0),
    0
  );

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const fetchData = async () => {
    // Pagos pendientes de recibir
    await axios
      .get(`http://localhost:3001/api/appointments/debts/${doctorId}`)
      .then((res) => {
        setPendingPayments(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [doctorId]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        margin: "15px",
      }}
    >
      <MetricBox
        title="Cobros totales"
        metric={formatNumberWithCommas(totalAmount.toFixed(0))}
        color="#F2F7FD"
        currency="$"
      />
      <MetricBox
        title="Estimado en USD"
        metric={formatNumberWithCommas(totalAmountUSD.toFixed(0))}
        color="#EEEFF4"
        currency="USD"
      />
      <MetricBox
        title="Pagos recibidos"
        metric={incomes.length}
        color="#F2F7FD"
        currency=""
      />
      <MetricBox
        title="Pagos pendientes"
        metric={formatNumberWithCommas(pendingPayments)}
        color="#FFFFC5"
        currency="$"
      />
    </div>
  );
};

export default Keypad;

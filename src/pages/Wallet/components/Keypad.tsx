import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import MetricBox from "./MetricBox";
import axios from "axios";

interface Income {
  patientName: string;
  serviceName: string;
  method: string;
  amount: number;
  amountUSD: number;
  status: string;
}

interface KeypadTableProps {
  incomes: Income[];
}

const Keypad: React.FC<KeypadTableProps> = ({ incomes }) => {
  const doctorId = useSelector((state: RootState) => state.user.id);
  const [pendingPayments, setPendingPayments] = useState([]);

  const totalAmount = incomes.reduce((total, entry) => {
    if (entry.status === "Full") {
      return total + entry.amount;
    }
    return total;
  }, 0);
  console.log(totalAmount, "totalAmount");

  const totalAmountUSD = incomes.reduce((total, entry) => {
    if (entry.status === "Full" && entry.amountUSD) {
      return total + entry.amountUSD;
    }
    return total;
  }, 0);

  function formatNumberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const fetchData = async () => {
    // Pagos pendientes de recibir
    await axios
      .get(
        `${import.meta.env.VITE_API_ROUTE}/api/appointments/debts/${doctorId}`
      )
      .then((res) => {
        console.log(res.data.data, "data pendiente");
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
        metric={formatNumberWithCommas(Number(totalAmount.toFixed(0)))}
        color="#F2F7FD"
        currency="$"
      />
      <MetricBox
        title="Estimado en USD"
        metric={formatNumberWithCommas(Number(totalAmountUSD.toFixed(0)))}
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
        metric={formatNumberWithCommas(Number(pendingPayments))}
        color="#FFFFC5"
        currency="$"
      />
    </div>
  );
};

export default Keypad;

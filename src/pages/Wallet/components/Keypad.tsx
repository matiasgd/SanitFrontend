import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MetricBox from "./MetricBox";
import axios from "axios";

interface Income {
  date: string;
  patient: string;
  services: Array<string>;
  method: string;
  amount: number;
  usd: number;
}

interface KeypadTableProps {
  incomes: Income[];
}

const Keypad: React.FC<KeypadTableProps> = ({ incomes }) => {
  const doctorId = useSelector((state: RootState) => state.user.id);
  const [exchangeRate, setExchangeRate] = useState(0); // [ARS, USD]
  const totalAmount = incomes.reduce((total, entry) => total + entry.amount, 0);

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const fetchData = async () => {
    // Tipo de cambio actual
    await axios
      .get(`http://localhost:3001/api/fx/USDARS`)
      .then((res) => {
        const average = (res.data.data.buyer + res.data.data.seller) / 2;
        setExchangeRate(average);
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
        metric="490"
        color="#EEEFF4"
        currency="USD"
      />
      <MetricBox
        title="Tipo de cambio"
        metric={exchangeRate.toFixed(0)}
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
        metric="17.000"
        color="#FFFFC5"
        currency="$"
      />
    </div>
  );
};

export default Keypad;

import React from "react";
import { Table } from "antd";

interface Income {
  date: string;
  patient: string;
  services: Array<string>;
  method: string;
  amount: number;
  usd: number;
}

interface IncomeTableProps {
  incomes: Income[];
}

const columns = [
  {
    title: "Fecha de pago",
    dataIndex: "paymentDate",
    key: "paymentDate",
  },
  {
    title: "Paciente",
    dataIndex: "patientName",
    key: "patientName",
  },
  {
    title: "Servicio",
    dataIndex: "serviceName",
    key: "services",
  },
  {
    title: "Metodo de pago",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "Ingreso ARS",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Conversion USD",
    dataIndex: "amountUSD",
    key: "usd",
  },
];

const IncomeTable: React.FC<IncomeTableProps> = ({ incomes }) => {
  return <Table dataSource={incomes} columns={columns} />;
};

export default IncomeTable;

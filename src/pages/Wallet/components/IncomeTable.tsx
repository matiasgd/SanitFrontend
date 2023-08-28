import React from "react";
import { Table } from "antd";

interface Income {
  paymentDate: string;
  patientName: string;
  serviceName: string;
  method: string;
  amount: number;
  amountUSD: number;
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
    key: "serviceName",
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
    key: "amountUSD",
  },
];

const IncomeTable: React.FC<IncomeTableProps> = ({ incomes }) => {
  return <Table dataSource={incomes} columns={columns} />;
};

export default IncomeTable;

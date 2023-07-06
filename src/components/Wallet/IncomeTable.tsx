import React from 'react';
import { Table } from 'antd';

interface Income {
  date: string;
  patient: string;
  services: Array<string>;
  payMethod: string;
  amount: number;
  usd: number; 
}

interface IncomeTableProps {
  incomes: Income[];
}


const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Patient',
    dataIndex: 'patient',
    key: 'patient',
  },
  {
    title: 'Services',
    dataIndex: 'services',
    key: 'services',
  },
  {
    title: 'Pay Method',
    dataIndex: 'payMethod',
    key: 'payMethod',
  },
  {
    title: 'ARS Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'USD Conversion',
    dataIndex: 'usd',
    key: 'usd',
  },
];

const IncomeTable: React.FC<IncomeTableProps> = ({ incomes }) => {
  return <Table dataSource={incomes} columns={columns} />;
};

export default IncomeTable;
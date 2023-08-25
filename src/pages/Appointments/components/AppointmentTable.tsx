import React from "react";
import { Table } from "antd";

interface Appointments {
  appointmentDate: string;
  patientName: string;
  serviceName: string;
  appointmentPrice: string;
  category: string;
  status: string;
}

interface ApppointmentTableProps {
  appointments: Appointments[];
  filterPayment: string;
}

const columns = [
  {
    title: "Fecha de atención",
    dataIndex: "appointmentDate",
    key: "appointmentDate",
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
    title: "Precio (AR$)",
    dataIndex: "appointmentPrice",
    key: "appointmentPrice",
  },
  {
    title: "Categoria",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Pago",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
  },
];

const AppointmentTable: React.FC<ApppointmentTableProps> = ({
  appointments,
  filterPayment,
}) => {
  return (
    <Table
      dataSource={appointments.filter(
        (appointment) => appointment.paymentStatus === filterPayment
      )}
      columns={columns}
    />
  );
};

export default AppointmentTable;

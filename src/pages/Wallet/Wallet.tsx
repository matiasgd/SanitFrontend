import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import IncomeTable from "./components/IncomeTable";
import Keypad from "./components/Keypad";
import DateRangePicker from "./components/DataRangePicker";
import { Button } from "antd";
import Sidebar from "../Me/Sidebar";
import axios from "axios";
import moment from "moment";

const Wallet: React.FC = () => {
  const doctorId = useSelector((state: RootState) => state.user.id);
  const [payments, setPayments] = useState([]);

  const transformPaymentData = (data) => {
    const transformedData = data.map((payment) => {
      const {
        amount,
        amountUSD,
        appointment,
        currency,
        doctor,
        method,
        paymentDate,
        status,
      } = payment;
      const { service, patient } = appointment;

      // Convierte la fecha de ISO 8601 a una fecha legible
      const formattedPaymentDate = moment(paymentDate).format("YYYY-MM-DD");

      // Asegúrate de usar las claves correctas para el nombre y el apellido del paciente
      const patientName = `${patient.name} ${patient.lastName}`;

      // Asegúrate de usar la clave correcta para el nombre del servicio
      const serviceName = service.serviceName;

      return {
        amount,
        amountUSD,
        serviceName,
        patientName,
        currency,
        doctor,
        method,
        paymentDate: formattedPaymentDate,
        status,
      };
    });

    return transformedData;
  };

  const fetchPaymentData = async () => {
    // Pagos
    await axios
      .get(`http://localhost:3001/api/payments/doctor/${doctorId}`)
      .then((res) => {
        const originalData = res.data.data;
        const transformedData = transformPaymentData(originalData);
        setPayments(transformedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPaymentData();
  }, [doctorId]);

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
              <Keypad incomes={payments} />
            </div>
            <div className="flex flex-col gap-5 p-4 align-center justify-center w-1/3 bg-gray-100 rounded-xl">
              <DateRangePicker />
              <Button>(+) Nuevo Pago</Button>
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

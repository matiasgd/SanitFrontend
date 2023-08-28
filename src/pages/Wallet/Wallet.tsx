import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import IncomeTable from "./components/IncomeTable";
import Keypad from "./components/Keypad";
//import DateRangePicker from "./components/DataRangePicker";
import { Button } from "antd";
import Sidebar from "../Me/Sidebar";
import axios from "axios";
import moment from "moment";

interface Service {
  serviceName: string;
}

interface Patient {
  name: string;
  lastName: string;
  age: number;
}

interface AppointmentProps {
  patient: Patient;
  service: Service;
}

interface PaymentsProps {
  amount: number;
  amountUSD: number;
  appointment: AppointmentProps;
  currency: string;
  doctor: string;
  method: string;
  paymentDate: string;
  status: string;
}

interface TransformedData {
  amount: number;
  amountUSD: number;
  patientName: string;
  serviceName: string;
  currency: string;
  method: string;
  paymentDate: string;
  status: string;
}

const Wallet: React.FC = () => {
  const doctorId = useSelector((state: RootState) => state.user.id);
  const [transformedData, setTransformedData] = useState<TransformedData[]>([]);

  const transformPaymentData = (data: PaymentsProps[]) => {
    const transformedData: TransformedData[] = data.map((payment) => {
      const {
        amount,
        amountUSD,
        appointment,
        currency,
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
        paymentDate: formattedPaymentDate,
        patientName,
        serviceName,
        method,
        amount,
        amountUSD,
        currency,
        status,
      };
    });

    setTransformedData(transformedData);
  };

  const fetchPaymentData = async () => {
    // Pagos
    await axios
      .get(`${import.meta.env.VITE_API_ROUTE}/api/payments/doctor/${doctorId}`)
      .then((res) => {
        console.log(res.data.data, "data");
        const originalData = res.data.data;
        transformPaymentData(originalData);
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
              <Keypad incomes={transformedData} />
            </div>
            <div className="flex flex-col gap-5 p-4 align-center justify-center w-1/3 bg-gray-100 rounded-xl">
              {/* <DateRangePicker  /> */}
              <Button>(+) Nuevo Pago</Button>
            </div>
          </div>
          <div className="p-4">
            <IncomeTable incomes={transformedData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

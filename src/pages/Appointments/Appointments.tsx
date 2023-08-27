import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AppointmentTable from "./components/AppointmentTable";
import Keypad from "./components/Keypad";
import { Button } from "antd";
import Sidebar from "../Me/Sidebar";
import axios from "axios";
import moment from "moment";

const Appointments: React.FC = () => {
  const doctorId = useSelector((state: RootState) => state.user.id);
  const [paidStatus, setPaidStatus] = useState("Pending");
  const [transformedData, setTransformedData] = useState<TransformedData[]>([]);

  const formatNumberWithCommas = (value: any) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  interface Patient {
    name: string;
    lastName: string;
    age: number;
  }

  interface Service {
    serviceName: string;
  }

  interface AppointmentsProps {
    startTime: string;
    appointmentPrice: number;
    service: Service;
    patient: Patient;
    category: string;
    status: string;
    paymentStatus: string;
  }

  interface TransformedData {
    appointmentDate: string;
    appointmentPrice: string;
    serviceName: string;
    patientName: string;
    category: string;
    status: string;
    paymentStatus: string;
  }

  const transformPaymentData = (data: AppointmentsProps[]) => {
    const transformedData = data.map((appointment) => {
      let {
        startTime,
        appointmentPrice,
        service,
        patient,
        category,
        status,
        paymentStatus,
      } = appointment;

      // Convierte la fecha de ISO 8601 a una fecha legible
      const formattedPaymentDate = moment(startTime).format("YYYY-MM-DD");
      // Asegúrate de usar la clave correcta para el nombre del servicio
      const serviceName = service.serviceName;
      // Asegúrate de usar las claves correctas para el nombre y el apellido del paciente
      const patientName = `${patient.name} ${patient.lastName}`;

      if (status === "Completed") {
        status = "Completada";
      } else if (status === "Pending") {
        status = "Pendiente";
      } else if (status === "Cancelled") {
        status = "Cancelada";
      }

      if (paymentStatus === "Completed") {
        paymentStatus = "Completada";
      } else if (paymentStatus === "Pending") {
        paymentStatus = "Pendiente";
      } else if (paymentStatus === "Partial") {
        paymentStatus = "Parcial";
      }

      if (category === "Union insurance") {
        category = "Obra social";
      } else if (category === "Private insurance") {
        category = "Prepaga";
      } else if (category === "Without insurance") {
        category = "Particular";
      }

      return {
        appointmentDate: formattedPaymentDate,
        appointmentPrice: formatNumberWithCommas(appointmentPrice),
        serviceName,
        patientName,
        category,
        status,
        paymentStatus,
      };
    });

    // Actualiza el estado con los datos transformados
    setTransformedData(transformedData);

    return transformedData;
  };

  const fetchAppointmentsData = async () => {
    // Citas medicas
    await axios
      .get(`${import.meta.env.VITE_API_ROUTE}/api/appointments/doctor/${doctorId}`)
      .then((res) => {
        const originalData = res.data.data;
        transformPaymentData(originalData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAppointmentsData();
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
              <Keypad appointments={transformedData} />
            </div>
            <div className="flex flex-col gap-5 p-4 align-center justify-center w-1/3 bg-gray-100 rounded-xl">
              {/* <DateRangePicker /> */}
              <div className="flex justify-center gap-4">
                <Button onClick={() => setPaidStatus("Completada")}>
                  Pago completo
                </Button>
                <Button onClick={() => setPaidStatus("Parcial")}>
                  Pago parcial
                </Button>
                <Button
                  onClick={() => {
                    setPaidStatus("Pendiente");
                  }}
                >
                  Pago Pendiente
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <AppointmentTable
              appointments={transformedData}
              filterPayment={paidStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

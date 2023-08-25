import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AppointmentTable from "./components/AppointmentTable";
import Keypad from "./components/Keypad";
import DateRangePicker from "./components/DataRangePicker";
import { Button } from "antd";
import Sidebar from "../Me/Sidebar";
import axios from "axios";
import moment from "moment";
import { formatNumberWithCommas } from "../../utils/formatNumbers";

const Appointments: React.FC = () => {
  const doctorId = useSelector((state: RootState) => state.user.id);
  const [appointments, setAppointments] = useState([]);

  const transformPaymentData = (data) => {
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
      console.log(startTime, "startTime");

      const formattedPaymentDate = moment(startTime).format("YYYY-MM-DD");
      console.log(formattedPaymentDate);
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
        paymentStatus = "Partial";
      }

      if (category === "Union insurance") {
        category = "Obra social";
      } else if (category === "Private insurance") {
        category = "Prepaga";
      } else if (category === "Without insurance") {
        category = "Particular";
      }
      console.log();

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

    return transformedData;
  };

  const fetchAppointmentsData = async () => {
    // Citas medicas
    await axios
      .get(`http://localhost:3001/api/appointments/doctor/${doctorId}`)
      .then((res) => {
        const originalData = res.data.data;

        const transformedData = transformPaymentData(originalData);
        console.log(transformedData, "transformedData");
        setAppointments(transformedData);
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
              <Keypad appointments={appointments} />
            </div>
            <div className="flex flex-col gap-5 p-4 align-center justify-center w-1/3 bg-gray-100 rounded-xl">
              <DateRangePicker />
              <div className="flex justify-center gap-4">
                <Button>Pago: Todas las consultas</Button>
                <Button>Pago: pendiente o parcial</Button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <AppointmentTable incomes={appointments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

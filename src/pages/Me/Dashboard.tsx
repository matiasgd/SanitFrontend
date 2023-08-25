import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Avatar, Button } from "antd";
import {
  TbStethoscope,
  TbUserPlus,
  TbReportMedical,
  TbCoin,
} from "react-icons/tb";
import AppointmentsModal from "../create/AppointmentsModal";
import PatientModal from "../create/PatientModal";
import SearchBar from "./components/SearchBar";
import Calendar from "../Calendar/Calendar";
import Sidebar from "./Sidebar";
import Stepper from "./components/Stepper";

const Dashboard = () => {
  // Redux
  const user = useSelector((state: RootState) => state.user);
  // States
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [currency, setCurrency] = useState("ARS"); // ARS, USD
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState("weekly"); // weekly, monthly, yearly
  const [isOpenPatientsModal, setOpenPatientsModal] = useState(false);
  const [isOpenAppointmentsModal, setIsOpenAppointmentsModal] = useState(false);

  // Utils
  function formatNumberWithCommas(value: Number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const fetchData = async () => {
    // Patients
    await axios
      .get(`http://localhost:3001/api/users/${user.id}/patients`)
      .then((res) => {
        setPatients(res.data.data);
      })
      .catch((err) => console.log(err));
    // Appointments
    await axios
      .get(`http://localhost:3001/api/appointments/doctor/${user.id}`)
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch((err) => console.log(err));
    // Payments
    await axios
      .get(`http://localhost:3001/api/payments/doctor/${user.id}`)
      .then((res) => {
        setPayments(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // facturacion
  const sales = appointments
    .filter((appointment) => appointment.status === "Completed")
    .map((appointment) => appointment.appointmentPrice)
    .reduce((total, price) => total + price, 0);

  const paymentsARS = payments.reduce(
    (total, payments) => total + payments.amount,
    0
  );

  const paymentsUSD = payments.reduce(
    (total, payments) => total + payments.amountUSD,
    0
  );

  useEffect(() => {
    fetchData();
  }, [user.id]);

  return (
    <>
      <div className="flex w-full p-4">
        <PatientModal
          isOpen={isOpenPatientsModal}
          onClose={() => setOpenPatientsModal(false)}
        />
        <AppointmentsModal
          isOpen={isOpenAppointmentsModal}
          onClose={() => {
            setIsOpenAppointmentsModal(false);
            fetchData();
          }}
        />
        <Sidebar />
        <div className="flex flex-col gap-4 w-full px-4">
          <div className="flex flex-col w-full gap-4 p-5 shadow-lg rounded-lg">
            <div className="flex gap-4">
              <div className="flex flex-col w-[30%]justify-center items-center bg-gray-200 rounded-xl p-2">
                <p className="font-bold text-lg">Tu Actividad General</p>
                <div className="flex">
                  <Button
                    type="link"
                    onClick={() => {
                      setFilter("weekly");
                    }}
                  >
                    Semanal
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      setFilter("monthly");
                    }}
                  >
                    Mensual
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      setFilter("yearly");
                    }}
                  >
                    Anual
                  </Button>
                </div>
              </div>
              <SearchBar patients={patients} appointments={appointments} />
            </div>

            <div className="flex flex-row w-full gap-4">
              <div className="flex gap-4 bg-gray-200 rounded-xl p-2 w-1/3">
                <Avatar className="bg-red-200">
                  <TbStethoscope className="text-3xl text-[#EB6350]" />
                </Avatar>
                <div className="flex-col">
                  <p className="font-bold text-lg  mt-1">Consultas</p>
                  <h2 className="text-[60px]">{appointments.length}</h2>
                  <Button
                    type="ghost"
                    className="bg-white text-black font-bold justify-center text-center  mr-4 border-2 border-black shadow-sm shadow-black outline-none"
                    onClick={() => setIsOpenAppointmentsModal(true)}
                  >
                    (+) Nueva
                  </Button>
                </div>
              </div>
              <div className="flex gap-4 bg-gray-200 rounded-xl p-2 w-1/3">
                <Avatar className="bg-blue-200">
                  <TbUserPlus className="text-3xl text-blue-500" />
                </Avatar>
                <div className="flex-col">
                  <p className="font-bold text-lg  mt-1">Pacientes</p>
                  <h2 className="text-[60px]">{patients.length}</h2>
                  <Button
                    type="ghost"
                    className="bg-white text-black font-bold justify-center text-center mr-4 border-2 border-black shadow-sm shadow-black outline-none"
                    onClick={() => setOpenPatientsModal(true)}
                  >
                    (+) Crear
                  </Button>
                </div>
              </div>
              <div className="flex gap-4 bg-gray-200 rounded-xl p-2 w-1/3">
                <Avatar className="bg-yellow-100">
                  <TbReportMedical className="text-3xl text-yellow-600" />
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-bold text-lg  mt-1">Facturación (ARS)</p>
                  <h2 className="text-[40px]">
                    {formatNumberWithCommas(sales)}
                  </h2>
                </div>
              </div>
              <div className="flex gap-4 bg-gray-200 rounded-xl p-2 w-1/3">
                <Avatar className="bg-green-100">
                  <TbCoin className="text-3xl text-green-600" />
                </Avatar>
                <div className="flex-col">
                  <p className="font-bold text-lg mt-1">Cobros</p>
                  <h2 className="text-[40px]">
                    {currency === "ARS" && formatNumberWithCommas(paymentsARS)}
                    {currency === "USD" && formatNumberWithCommas(paymentsUSD)}
                  </h2>
                  <Button
                    onClick={() => setCurrency("ARS")}
                    type="ghost"
                    className={clsx(
                      `bg-white text-black font-bold justify-center text-center mr-2 border-2 border-black shadow-sm shadow-black outline-none`,
                      currency === "ARS" && "bg-green-200"
                    )}
                  >
                    ARS
                  </Button>
                  <Button
                    onClick={() => setCurrency("USD")}
                    type="ghost"
                    className={clsx(
                      `bg-white text-black font-bold justify-center text-center mr-2 border-2 border-black shadow-sm shadow-black outline-none`,
                      currency === "USD" && "bg-green-200"
                    )}
                  >
                    USD
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Calendar appointments={appointments} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

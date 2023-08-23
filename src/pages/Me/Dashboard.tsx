import axios from "axios";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Avatar, Button } from "antd";
import { TbStethoscope, TbUserPlus, TbMedicalCross } from "react-icons/tb";
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
  const [filter, setFilter] = useState("weekly"); // weekly, monthly, yearly
  const [isOpenPatientsModal, setOpenPatientsModal] = useState(false);
  const [isOpenAppointmentsModal, setIsOpenAppointmentsModal] = useState(false);

  // Utils
  function formatNumberWithCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const fetchData = async () => {
    // Pacientes
    await axios
      .get(`http://localhost:3001/api/users/${user.id}/patients`)
      .then((res) => {
        setPatients(res.data.data);
      })
      .catch((err) => console.log(err));

    // Citas
    await axios
      .get(`http://localhost:3001/api/appointments/doctor/${user.id}`)
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  // facturacion
  const sales = appointments
    .filter((appointment) => appointment.status === "Completed")
    .map((appointment) => appointment.appointmentPrice)
    .reduce((total, price) => total + price, 0);

  useEffect(() => {
    fetchData();
  }, [user.id]);

  return (
    <>
      {user.profileCompleted ? (
        <Stepper />
      ) : (
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
                <p className="font-bold text-lg w-[20%] mt-1">
                  Tu Actividad General
                </p>
                <button
                  onClick={() => {
                    setFilter("weekly");
                  }}
                >
                  Semanal
                </button>

                <button
                  onClick={() => {
                    setFilter("monthly");
                  }}
                >
                  Mensual
                </button>

                <button
                  onClick={() => {
                    setFilter("yearly");
                  }}
                >
                  Anual
                </button>
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
                      className="bg-white text-black font-bold justify-center text-center  mr-4 border-2 border-black shadow-sm shadow-black outline-none"
                      onClick={() => setOpenPatientsModal(true)}
                    >
                      (+) Crear
                    </Button>
                  </div>
                </div>
                <div className="flex gap-4 bg-gray-200 rounded-xl p-3 w-1/3">
                  <Avatar className="bg-yellow-100">
                    <TbMedicalCross className="text-3xl text-yellow-600" />
                  </Avatar>
                  <div className="flex-col">
                    <p className="font-bold text-lg  mt-1">Facturación</p>
                    <h2 className="text-[60px]">
                      {formatNumberWithCommas(sales)}
                    </h2>
                    {/* <Button
                      onClick={() => setCurrency("ARS")}
                      type="ghost"
                      className={clsx(
                        `bg-white text-black font-bold justify-center text-center  mr-4 border-2 border-black shadow-sm shadow-black outline-none`,
                        currency === "ARS" && "bg-yellow-200"
                      )}
                    >
                      ARS
                    </Button>
                    <Button
                      onClick={() => setCurrency("USD")}
                      type="ghost"
                      className={clsx(
                        `bg-white text-black font-bold justify-center text-center  mr-4 border-2 border-black shadow-sm shadow-black outline-none`,
                        currency === "USD" && "bg-yellow-200"
                      )}
                    >
                      USD
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
            <Calendar appointments={appointments} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

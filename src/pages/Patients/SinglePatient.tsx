import Sidebar from "../Me/Sidebar";
import Patient from "./components/Patient";
import ClinicalHistory from "./components/ClinicalHistory";
import PatientApointments from "./components/PatientAppointments";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);

  const fetchPatientsData = async () => {
    // Busqueda de Paciente
    await axios
      .get(`${import.meta.env.VITE_API_ROUTE}api/patients/${id}`)
      .then((res) => {
        setPatient(res.data.data);
      })
      .catch((err) => console.log(err));

    // Busqueda de appointments del paciente    
    await axios
      .get(`${import.meta.env.VITE_API_ROUTE}api/appointments/patient/${id}`)
      .then((res) => {
        setAppointments(res.data.data);
      })
      .catch((err) => console.log(err));

    // Busqueda de appointments del paciente
    await axios
      .get(`${import.meta.env.VITE_API_ROUTE}api/payments/patient/${id}`)
      .then((res) => {
        console.log(res.data.data, "payments");
        setPayments(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPatientsData();
  }, [id]);

  return (
    <div className="flex py-4">
      <Sidebar />
      <div className="flex w-full gap-4 px-4">
        <div className="flex flex-col gap-4 w-[70%]">
          <Patient patient={patient} />
          <ClinicalHistory appointments={appointments} payments={payments} />
        </div>
        <div className="flex flex-col w-[30%]">
          <PatientApointments appointments={appointments} />
        </div>
      </div>
    </div>
  );
};

export default SinglePatient;

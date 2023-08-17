import Sidebar from "./Sidebar";
import Patient from "./components/Patient";
import ClinicalHistory from "./components/ClinicalHistory";
import PatientApointments from "./components/PatientAppointments";

const SinglePatient = () => {
  return (
    <div className="flex py-4">
      <Sidebar />
      <div className="flex w-full gap-4 px-4">
        <div className="flex flex-col gap-4 w-[70%]">
          <Patient />
          <ClinicalHistory />
        </div>
        <div className="flex flex-col w-[30%]">
          <PatientApointments />
        </div>
      </div>
    </div>
  );
};

export default SinglePatient;

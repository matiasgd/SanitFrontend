import { Routes, Route } from "react-router";
import AuthForm from "./pages/Login/AuthForm";
import Dashboard from "./pages/Me/Dashboard";
import ProfilePage from "./pages/Profile/ProfilePage";
import Patient from "./pages/Patients/SinglePatient";
import Patients from "./pages/Patients/Patients";
import Appointments from "./pages/Appointments/Appointments";
import Home from "./pages/Home/Home";
import Wallet from "./pages/Wallet/Wallet";
import Stepper from "./pages/Me/components/Stepper";
import CompletePatient from "./pages/Patients/CompletePatient";
import NewPassword from "./pages/Login/NewPassword";
import SetNewPassword from "./pages/Login/SetNewPassword";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/password" element={<NewPassword />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patient/complete/:token" element={<CompletePatient />} />
      <Route path="/reset-password/:token" element={<SetNewPassword />} />
      <Route path="/patient/:id" element={<Patient />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/home" element={<Home />} />
      <Route path="/me" element={<ProfilePage />} />
      <Route path="/stepper" element={<Stepper />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/404">ERROR 404</Route>
    </Routes>
  );
}

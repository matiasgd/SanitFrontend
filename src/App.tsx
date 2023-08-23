import { Routes, Route } from "react-router";
import AuthForm from "./pages/Login/AuthForm";
import Dashboard from "./pages/Me/Dashboard";
import Patient from "./pages/Patients/SinglePatient";
import Patients from "./pages/Patients/Patients";
import Home from "./pages/Home/Home";
import Wallet from "./pages/Wallet/Wallet";
import AddressForm from "./pages/create/AddressForm";
import Modal from "./pages/create/ModalTest";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patient/:id" element={<Patient />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/home" element={<Home />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/404">ERROR 404</Route>
      <Route path="/address" element={<AddressForm />} />
      <Route path="/modal" element={<Modal />} />
    </Routes>
  );
}

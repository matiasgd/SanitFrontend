import { Routes, Route } from "react-router";
import AuthForm from "./pages/Login/AuthForm";
import Dashboard from "./pages/Me/Dashboard";
import Patient from "./pages/Me/Home";
import Patients from "./pages/Me/components/Patients";
import Home from "./pages/Home/Home";
import Wallet from "./pages/Wallet/Wallet";
import Calendar from "./pages/Calendar/Calendar";
import AddressForm from "./pages/create/AddressForm";
import Service from "./pages/services/Service";
import Modal from "./pages/create/ModalTest";
import Origin from "./pages/Me/Origin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/me" element={<Dashboard />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/home" element={<Home />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/404">ERROR 404</Route>
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/address" element={<AddressForm />} />
      <Route path="/service" element={<Service />} />
      <Route path="/modal" element={<Modal />} />
      <Route path="/origin" element={<Origin />} />
    </Routes>
  );
}

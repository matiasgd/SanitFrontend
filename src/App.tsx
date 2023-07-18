import { Routes, Route } from "react-router";
import AuthForm from "./pages/Login/AuthForm";
import Dashboard from "./pages/Me/Dashboard";
import Patient from "./pages/Me/Home";
import Patients from "./pages/Me/components/Patients";
import Home from "./pages/Home/Home";
import Wallet from "./pages/Wallet/Wallet";
import Calendar from "./pages/Calendar/Calendar";
import AddressForm from "./pages/create/AddressForm";
import Modal from "./pages/create/ModalTest";

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
      <Route path="/adress" element={<AddressForm />} />
      <Route path="/modal" element={<Modal />} />
    </Routes>
  );
}

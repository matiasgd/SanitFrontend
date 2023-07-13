import { Routes, Route } from "react-router";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Patient from "./components/Dashboard/Home";
import Home from "./components/Home/Home";
import Wallet from "./components/Wallet/Wallet";
import Calendar from "./components/Calendar/Calendar";
import AddressForm from "./components/create/address";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/me" element={<Dashboard />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/home" element={<Home />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/404">ERROR 404</Route>
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/adress" element={<AddressForm />} />
    </Routes>
  );
}

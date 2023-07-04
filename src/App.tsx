import { Routes, Route } from "react-router";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Patient from "./components/Dashboard/Home";
import Home from "./components/Home/Home";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/me" element={<Dashboard />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/home" element={<Home />} />
      <Route path="/404">ERROR 404</Route>
    </Routes>
  );
}

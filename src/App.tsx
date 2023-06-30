import { Routes, Route } from "react-router";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Home from "./components/Dashboard/Home";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/me" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/404">ERROR 404</Route>
    </Routes>
  );
}

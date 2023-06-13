import { Routes, Route } from "react-router";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/me" element={<Dashboard />} />
      <Route path="/404">ERROR 404</Route>
    </Routes>
  );
}

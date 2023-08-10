import axios from "axios";
import { Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { logOut } from "../../store/user";
import customMessage from "../../commons/customMessage";
import Stepper from "./Stepper";
import { TbStethoscope, TbUserPlus, TbMedicalCross } from "react-icons/tb";
import PatientModal from "../create/PatientModal";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Calendar from "../Calendar/Calendar";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // useEffect(() => {
  //   if (!user?.id) {
  //     navigate("/");
  //   }
  // }, [navigate, user]);

  // Handlers
  const handleLogOut = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout");
      dispatch(logOut());
      customMessage("success", "Sesión finalizada, hasta la próxima!");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PatientModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      {!user.profileCompleted ? (
        <Stepper />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <SearchBar />
          </div>

          <div className="flex w-full gap-4">
            <div className="flex gap-4 bg-gray-200 rounded-xl p-2 w-1/3">
              <Avatar className="bg-red-200">
                <TbStethoscope className="text-3xl text-[#EB6350]" />
              </Avatar>
              <div className="flex-col">
                <p className="font-bold text-lg  mt-1">Servicios</p>
                <h2 className="text-[60px]">3</h2>
                <Button
                  type="ghost"
                  className="bg-transparent text-black font-bold justify-center text-center  mr-4 border-2 border-black shadow-sm shadow-black outline-none"
                  onClick={() => setModalOpen(true)}
                >
                  (+) Crear
                </Button>
              </div>
            </div>
            <div className="flex gap-4 bg-gray-200 rounded-xl p-2 w-1/3">
              <Avatar className="bg-blue-200">
                <TbUserPlus className="text-3xl text-blue-500" />
              </Avatar>
              <div className="flex-col">
                <p className="font-bold text-lg  mt-1">Pacientes</p>
                <h2 className="text-[60px]">30</h2>
                <Button
                  type="ghost"
                  className="bg-transparent text-black font-bold justify-center text-center  mr-4 border-2 border-black shadow-sm shadow-black outline-none"
                  onClick={() => setModalOpen(true)}
                >
                  (+) Crear
                </Button>
              </div>
            </div>
            <div className="flex gap-4 bg-gray-200 rounded-xl p-2 w-1/3">
              <Avatar className="bg-yellow-100">
                <TbMedicalCross className="text-3xl text-yellow-600" />
              </Avatar>
              <div className="flex-col">
                <p className="font-bold text-lg  mt-1">Consultas</p>
                <h2 className="text-[60px]">250</h2>
                <Button
                  type="ghost"
                  className="bg-transparent text-black font-bold justify-center text-center  mr-4 border-2 border-black shadow-sm shadow-black outline-none"
                  onClick={() => setModalOpen(true)}
                >
                  (+) Nueva
                </Button>
              </div>
            </div>
          </div>
          <Calendar />
        </div>
      )}
    </>
  );
};

export default Dashboard;

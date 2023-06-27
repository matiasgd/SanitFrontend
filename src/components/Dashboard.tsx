import axios from "axios";
import Button from "../commons/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logOut } from "../store/user";
import customMessage from "../commons/customMessage";
import Stepper from "./Stepper";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user?.id === null) {
      navigate("/");
    }
  }, [navigate, user]);

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
    <div>
      <div className="flex justify-center mt-4 mb-10">
        <Button type="button" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
      <div className="p-10">
        <Stepper />
      </div>
    </div>
  );
};

export default Dashboard;

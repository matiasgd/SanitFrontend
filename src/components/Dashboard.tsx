import axios from "axios";
import Button from "../commons/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { logOut } from "../store/user";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  useEffect(() => {
    if (user?.profile === null) {
      navigate("/");
    }
  }, [navigate, user]);

  // Handlers
  const handleLogOut = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout");
      dispatch(logOut());
      toast.success("Sesión Finalizada.");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button type="button" onClick={handleLogOut}>
      Log Out
    </Button>
  );
};

export default Dashboard;

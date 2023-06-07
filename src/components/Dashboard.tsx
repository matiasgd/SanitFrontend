import Button from "../commons/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../store/user";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  // Redux
  const dispatch = useDispatch();
  // LocalStorage
  const localStorageUser = JSON.stringify(localStorage.getItem("profile"));

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("profile");
    toast.success(`Hasta la próxima ${localStorageUser}!`);
    navigate("/");
  };

  return (
    <Button type="button" onClick={handleLogOut}>
      Log Out
    </Button>
  );
};

export default Dashboard;

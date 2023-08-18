import axios from "axios";
import clsx from "clsx";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../store/user";
import customMessage from "../../commons/customMessage";
import { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import {
  MdSpaceDashboard,
  MdAccountBalanceWallet,
  MdCalendarToday,
} from "react-icons/md";
import { BsReverseLayoutTextWindowReverse, BsPersonFill } from "react-icons/bs";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";

const sections = [
  { name: "Panel", icon: <MdSpaceDashboard />, route: "/dashboard" },
  { name: "Ingresos", icon: <MdAccountBalanceWallet />, route: "/wallet" },
  { name: "Pacientes", icon: <BsPersonFill />, route: "/patients" },
  { name: "Servicios", icon: <MdCalendarToday />, route: "/patient" },
  {
    name: "Modales",
    icon: <BsReverseLayoutTextWindowReverse />,
    route: "/modal",
  },
];

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<any>([]);

  const matchedSection = sections.find(
    (section) => location.pathname === section.route
  );

  useEffect(() => {
    if (matchedSection) {
      setSelectedItem(matchedSection.route);
    }
  }, [location.pathname, matchedSection]);

  // useEffect(() => {
  //   if (!user?.id) {
  //     navigate("/");
  //   }
  // }, [navigate, user]);

  const handleLogOut = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout");
      dispatch(logOut());
      customMessage("success", "Sesión finalizada, hasta la próxima!");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } catch (error) {
      console.error(error);
      customMessage("error", "Intente otra vez.");
    }
  };

  const FetchUserData = async () => {
    await axios
      .get(`http://localhost:3001/api/users/${user.id}`)
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    FetchUserData();
  }, []);

  return (
    <div className="flex h-[95vh]">
      <div
        className="flex flex-col justify-between rounded-e-2xl"
        style={{ boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)" }}
      >
        <div className={isExpanded ? "w-48" : "w-[60px]"}>
          {isExpanded && (
            <div className="mb-4 p-2 flex w-[60%] justify-center items-center">
              <img src="logo.png" alt="Logo" />
            </div>
          )}
          <ul className="justify-center items-center p-1">
            {isExpanded && <li className="font-bold p-4">Manage</li>}
            {sections.map((section, i) => (
              <Link to={section.route} key={i}>
                <li
                  className={clsx(
                    `flex gap-4 p-4 text-gray-500 hover:text-blue-400 hover:bg-blue-50 rounded-xl`,
                    selectedItem === section.route &&
                      "text-blue-600 bg-blue-100"
                  )}
                >
                  <div className="text-xl">{section.icon}</div>
                  <div className={!isExpanded ? "hidden" : ""}>
                    {section.name}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 w-full px-2 py-4 border-t-2 border-gray-300 cursor-pointer">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="bg-gray-400 hover:bg-blue-400"
            onClick={() => handleLogOut()}
          />
          {isExpanded && (
            <div className="flex flex-col justify-around ">
              <p className="text-sm font-semibold">Homer Simpson</p>
              <p className="text-xs text-gray-400 font-bold">
                {userData.email}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center bg-transparent">
        <div
          className="items-center py-4 px-1 rounded-e-full"
          style={{ boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)" }}
        >
          <button onClick={() => setIsExpanded(!isExpanded)}>
            <div className="text-lg text-gray-500 hover:text-blue-400">
              {isExpanded ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import axios from "axios";
import clsx from "clsx";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../store/user";
import customMessage from "../../commons/customMessage";
import { useState, useEffect } from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import {
  MdSpaceDashboard,
  MdAccountBalanceWallet,
  MdCalendarToday,
  MdFace,
} from "react-icons/md";
import { BsPersonFill, BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";

const sections = [
  { name: "Panel", icon: <MdSpaceDashboard />, route: "/dashboard" },
  { name: "Ingresos", icon: <MdAccountBalanceWallet />, route: "/wallet" },
  { name: "Pacientes", icon: <BsPersonFill />, route: "/patients" },
  { name: "Mi perfil", icon: <MdFace />, route: "/me" },
  { name: "Consultas", icon: <MdCalendarToday />, route: "/appointments" },
];

interface UserDataProps {
  name: string;
  lastName: string;
  email: string;
}

const Sidebar: React.FC = () => {
  // States
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  // Location
  const location = useLocation();
  const navigate = useNavigate();
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const FetchUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}api/users/${user.id}`
      );
      const userDataFromApi = response.data.user;
      setUserData(userDataFromApi);
    } catch (error) {
      console.error(error);
      customMessage("error", "Intente otra vez.");
    }
  };

  const matchedSection = sections.find(
    (section) => location.pathname === section.route
  );

  useEffect(() => {
    if (matchedSection) {
      setSelectedItem(matchedSection.route);
    }
  }, [location.pathname, matchedSection]);

  useEffect(() => {
    if (!user?.id) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  const handleLogOut = async () => {
    try {
      await axios
        .post(`${import.meta.env.VITE_API_ROUTE}api/auth/logout`, null, {
          withCredentials: true,
        })
        .then((res) => {
          customMessage("success", res.data);
          dispatch(logOut());
        });
    } catch (error) {
      console.error(error);
      customMessage("error", "Algo salió mal, intente nuevamente");
    }
  };

  useEffect(() => {
    if (user?.id) {
      FetchUserData();
    }
  }, [user]);

  return (
    <div className="flex h-[95vh]">
      <div
        className="flex flex-col justify-between rounded-e-2xl dark:bg-neutral-800"
        style={{ boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)" }}
      >
        <div className={isExpanded ? "w-48" : "w-[60px]"}>
          {isExpanded && (
            <div className="mb-4 p-2 flex w-[60%] justify-center items-center">
              <img src="logo.png" alt="Logo" />
            </div>
          )}
          <ul className="justify-center items-center p-1">
            {isExpanded && (
              <li className="font-bold p-4 dark:text-gray-400">Administrar</li>
            )}
            {sections.map((section, i) => (
              <Link to={section.route} key={i}>
                <li
                  className={clsx(
                    `flex gap-4 p-4 text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-neutral-600 rounded-xl`,
                    selectedItem === section.route &&
                      "text-blue-600 bg-blue-100 dark:bg-neutral-700"
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
        <div className="flex flex-col gap-2 w-full py-4 border-t-2 border-gray-300 dark:border-neutral-500">
          <div className="flex justify-start items-center gap-2 ml-3 cursor-pointer">
            <Avatar
              icon={
                theme === "light" ? (
                  <BsMoonStarsFill className="m-[6px]" />
                ) : (
                  <BsSunFill className="m-[6px]" />
                )
              }
              className={clsx(
                `bg-gray-400`,
                theme === "dark"
                  ? "hover:bg-yellow-200 hover:text-secondary"
                  : "hover:bg-secondary hover:text-yellow-200"
              )}
              onClick={handleChangeTheme}
            />
            {isExpanded && (
              <p
                className="text-sm font-semibold text-gray-500 dark:text-gray-400"
                onClick={handleChangeTheme}
              >
                {theme === "dark" && "Light mode"}
                {theme === "light" && "Dark mode"}
              </p>
            )}
          </div>
          <div
            className="flex justify-start items-center gap-2 ml-3 cursor-pointer"
            onClick={() => navigate("/me")}
          >
            <Avatar
              icon={<UserOutlined className="m-[6px]" />}
              className="bg-gray-400 hover:bg-blue-400"
            />
            {isExpanded && userData && (
              <div className="flex-col">
                <p className="text-sm font-semibold dark:text-gray-400">
                  {userData.name && userData.lastName ? userData.name : ""}
                </p>
                <p className="text-xs text-gray-500 font-bold dark:text-gray-400">
                  {userData.email}
                </p>
              </div>
            )}
          </div>
          <div
            className="flex justify-start items-center gap-2 ml-3 cursor-pointer"
            onClick={() => handleLogOut()}
          >
            <Avatar
              icon={<LogoutOutlined className="m-[6px]" />}
              className="bg-gray-400 hover:bg-red-400"
            />
            {isExpanded && (
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Cerrar Sesión
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center bg-transparent">
        <div
          className="items-center py-4 px-1 rounded-e-full dark:bg-neutral-800"
          style={{ boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)" }}
        >
          <button onClick={() => setIsExpanded(!isExpanded)}>
            <div className="text-lg text-gray-400 hover:text-blue-400">
              {isExpanded ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

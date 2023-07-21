import React, { useState } from "react";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import {
  MdSpaceDashboard,
  MdAccountBalanceWallet,
  MdCalendarToday,
  MdInsertChart,  
  MdOutlineSupportAgent,
} from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import { LuPill } from "react-icons/lu";

const Sidebar: React.FC = ({ onSelect }) => {
  const sections = [
    { name: "Panel", icon: <MdSpaceDashboard /> },
    { name: "Ingresos", icon: <MdAccountBalanceWallet /> },
    { name: "Pacientes", icon: <BsPersonFill /> },
    { name: "Turnos", icon: <MdCalendarToday /> },
    { name: "Consultas", icon: <BiPlusMedical /> },
    { name: "Recetas", icon: <LuPill /> },
    { name: "Informes", icon: <MdInsertChart /> },
    { name: "Soporte", icon: <MdOutlineSupportAgent /> },
  ];

  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [hoveredItems, setHoveredItems] = useState(
    Array(sections.length).fill(false)
  );

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
    if (onSelect) {
      onSelect(sections[index].name);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredItems((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = true;
      return updatedState;
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredItems((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = false;
      return updatedState;
    });
  };

  const sidebarStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#FCFDFE",
    borderRadius: "15px",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
    padding: "10px",
    justifyContent: "space-between",
  };

  const logoStyle = {
    marginBottom: "20px",
    display: "flex",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  };

  const listItemStyle = {
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    backgroundColor: "initial",
    display: "flex",
    borderRadius: "10px",
  };

  const listItemStyleSelected = {
    ...listItemStyle,
    backgroundColor: "#E3F0FC",
    color: "#1D83D8",
  };

  const listIconStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    width: "20px",
    height: "25px",
    marginRight: "15px",
  };

  const listButtonStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
    borderRadius: "10px",
  };

  const avatarStyle = {
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #DDD",
    marginTop: "10px",
    paddingTop: "10px",
    cursor: "pointer",
  };

  return (
    <div style={{display:"flex", height: "100%", alignItems:"center"}}>
      <div style={
                  isExpanded === true
                    ? {...sidebarStyle, width: "200px",}
                    : {...sidebarStyle, width: "60px",
                      }
                }>
        <div>
          <div style={logoStyle}>
            <img src="logo.png" alt="Logo" />
          </div>
          <ul>
            <li>
              <strong style={listItemStyle}>Manage</strong>
            </li>
            {sections.map((section, index) => (
              <li
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => handleItemClick(index)}
                style={
                  selectedItemIndex === index
                    ? listItemStyleSelected
                    : {
                        ...listButtonStyle,
                        backgroundColor: hoveredItems[index]
                          ? "#F2F7FD"
                          : "initial",
                        color: hoveredItems[index] ? "#7EC0ED" : "#999",
                      }
                }
              >
                <div
                  style={{
                    ...listIconStyle,
                  }}
                >
                  <div>{section.icon}</div>
                  <div>{isExpanded && <div>{section.name}</div>}</div>
                </div>
                <div></div>
              </li>
            ))}
          </ul>
        </div>
        <div style={avatarStyle}>
          <div style={{ flex: "0 0 auto", marginRight: "10px" }}>
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
          {isExpanded && (
          <div className="text" style={{ flex: "1 1 auto" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold" }}>
              nombre , apellido
            </div>
            <div
              className="specialty"
              style={{ fontSize: "10px", color: "#999" }}
            >
              especialidad
            </div>
          </div>)}
        </div>
      </div>
      <div style={{display:"flex", height:"45px", width:"25px", justifyContent: "center",  borderRadius:"0 20px 20px 0", backgroundColor:"#FCFDFE",  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",}}>
        <button style={{display:"flex", alignItems:"center" }}onClick={handleToggle}>
          {isExpanded ? <LeftOutlined /> : < RightOutlined/>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

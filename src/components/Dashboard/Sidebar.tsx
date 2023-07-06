import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const Sidebar: React.FC = () => {
  const sections = [
    { name: "Dashboard", route: "dashboardIcon.svg" },
    { name: "Calendar", route: "calendarIcon.svg" },
    { name: "Patients", route: "patienIcon.svg" },
    { name: "Metrics", route: "graphicIcon.svg" },
    { name: "Presciptions", route: "vitaminIcon.svg" },
    { name: "Help Center", route: "helpIcon.svg" },
    { name: "Notifications", route: "notificationIcon.svg" },
  ];

  const sidebarStyle = {
    flex: "1",
    width: "auto",
    backgroundColor: "#FCFDFE",
    borderRadius: "15px",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
    padding: "10px",
    alignItems: "center",
    justifyContent: "center",
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

  const listado = {
    backgroundColor: "#FCFDFE",
  };

  const fecha = {
    backgroundColor: "#F2F7FD",
    padding: "10px",
    borderRadius: "5px",
    color: "#5F8DCA",
    marginBottom: "10px",
  };

  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = currentDate.toLocaleString("en-US", options);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredItem(index.toString());
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>
        <img src="logo.png" alt="Logo" />
      </div>
      <div style={listado}>
        <ul>
          <li>
            <strong style={listItemStyle}>Manage</strong>
          </li>
          {sections.map((section, index) => (
            <li
              key={index}
              style={{
                ...listItemStyle,
                backgroundColor:
                  hoveredItem === index.toString() ? "#F2F7FD" : "initial",
                color: hoveredItem === index.toString() ? "#5F8DCA" : "black",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                style={{ width: "20px", height: "20px", marginRight: "15px" }}
              >
                <img src={section.route} alt="Logo" />
              </div>
              <div>{section.name}</div>
            </li>
          ))}
        </ul>
      </div>
      <div style={fecha}>{formattedDate}</div>
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", borderTop: "1px solid #DDD",
        marginTop: "10px",
        paddingTop: "10px", }}
      >
        <div
          className="avatar"
          style={{ flex: "0 0 auto", marginRight: "10px" }}
        >
          <Avatar size="large" icon={<UserOutlined />} />
        </div>
        <div className="text" style={{ flex: "1 1 auto" }}>
          <div
            className="name"
            style={{ fontSize: "12px", fontWeight: "bold" }}
          >
            Matias Dominguez
          </div>
          <div
            className="specialty"
            style={{ fontSize: "10px", color: "#999" }}
          >
            Especialista en casi todo
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

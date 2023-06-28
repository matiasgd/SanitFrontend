import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

const Navbar = () => {
  // States
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navLinks = [
    {
        id: "services",
        title: "Servicios",
    },
    {
        id: "benefits",
        title: "Beneficios",
      },
    {
      id: "about",
      title: "Equipo",
    },
    {
      id: "contact",
      title: "Contacto",
    },
  ];

  return (
    <nav
      className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 bg-black`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="text-white text-[18px] font-bold cursor-pointer flex hover:text-[#DE4C36]">
            Sanit &nbsp;
            <span className="sm:block hidden">
              <span className="text-[#DE4C36]">|&nbsp;</span> We
              Care
            </span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-[#DE4C36]" : "text-white"
              } hover:text-[#DE4C36] text-[18px] font-medium cursor:pointer`}
              onClick={() => {
                setActive(link.title);
              }}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <CloseOutlined /> : <MenuOutlined />}
          </div>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-[#DE4C36]" : "text-white"
                  } font-poppins font-medium cursor-pointer text-[16px] hover:text-[#DE4C36]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Button type="primary" className="text-white text-[18px] font-bold cursor-pointer flex hover:text-white">Iniciar sesion</Button>
    </nav>
  );
};

export default Navbar;
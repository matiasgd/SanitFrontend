import { useState } from "react";
import { Link } from "react-router-dom";
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
      id: "team",
      title: "Equipo",
    },
    {
      id: "contact",
      title: "Contacto",
    },
  ];

  return (
    <nav className="sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 bg-secondary">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="text-white text-lg font-bold cursor-pointer flex hover:text-primary">
            Sanit &nbsp; <span className="text-primary">|&nbsp;&nbsp;</span>
            <span className="lg:block hidden"> We Care</span>
          </p>
        </Link>
        <Link
          to="/login"
          className="outline-none border-none text-white hover:text-primary hover:font-bold font-medium text-lg cursor-pointer"
        >
          Iniciar Sesión
        </Link>
        <ul className="list-none hidden md:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-primary" : "text-white"
              } hover:text-primary hover:font-bold text-lg font-medium cursor:pointer`}
              onClick={() => {
                setActive(link.title);
              }}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="md:hidden flex flex-1 justify-end items-center">
          <div
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <CloseOutlined className="text-white" />
            ) : (
              <MenuOutlined className="text-white" />
            )}
          </div>
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-secondary absolute top-10 right-0 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-primary" : "text-white"
                  } font-poppins font-medium cursor-pointer text-[16px] hover:text-primary`}
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
    </nav>
  );
};

export default Navbar;

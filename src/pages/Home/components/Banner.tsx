import React from "react";
import { Carousel } from "antd";
import logo from "/logo.png";
import banner1 from "../../../images/banner.png";

const contentStyle: React.CSSProperties = {
  height: "400px",
  color: "#fff",
  lineHeight: "400px",
  textAlign: "center",
  background: "#364d79",
  width: "100%",
};

const App: React.FC = () => (
  <Carousel autoplay className="mt-20">
    <div className="w-full">
      <img src={banner1} style={contentStyle} alt="Sanit" />
    </div>
    <div>
      <img src={logo} alt="Sanit" style={contentStyle} />
    </div>
  </Carousel>
);

export default App;

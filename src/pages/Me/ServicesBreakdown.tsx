import { useState } from "react";
import ServiceCard from "./ServiceCard";
// import AppointmentDetails from "./components/AppointmentDetails";
import moment from "moment";

interface ServicesBreakdownProps {
  services: any[];
}

const ServicesBreakdown: React.FC<ServicesBreakdownProps> = ({ services }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "50%",
    minWidth: "650px",
    borderRadius: "10px",
    padding: "20px",
    gap: "20px",
  };

  const header = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  };

  const servicesBox = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  };

  const generateColorScale = (
    startColor: string,
    endColor: string,
    steps: number
  ): string[] => {
    const startRGB = hexToRGB(startColor);
    const endRGB = hexToRGB(endColor);
    const scale: string[] = [];

    for (let i = 0; i < steps; i++) {
      const percent = i / (steps - 1);
      const color = interpolateColor(startRGB, endRGB, percent);
      scale.push(rgbToHex(color));
    }

    return scale;
  };

  const hexToRGB = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const interpolateColor = (color1: any, color2: any, percent: number) => {
    const r = Math.round((1 - percent) * color1.r + percent * color2.r);
    const g = Math.round((1 - percent) * color1.g + percent * color2.g);
    const b = Math.round((1 - percent) * color1.b + percent * color2.b);
    return { r, g, b };
  };

  const rgbToHex = (color: any) => {
    const componentToHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    const { r, g, b } = color;
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const colorScale = generateColorScale("#3B6FB6", "#F2F2F2", services.length);

  return (
    <div className=" gap-5 rounded-xl mt-5">
      <div style={boxStyle}>
        <div style={header}>
          <div className="flex justify-center items-center text-sm font-bold ">
            Servicos de consultorio:{" "}
          </div>
        </div>
        <div style={servicesBox}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              serviceName={service.serviceName}
              createdAt={moment(service.createdAt).format("DD-MM-YYYY")}
              price={service.price}
              circleColor={colorScale[index]}
              onClick={() => setSelectedCard(service)}
            />
          ))}
        </div>
      </div>
      {/* {selectedCard && (
        <AppointmentDetails
          selected={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )} */}
    </div>
  );
};

export default ServicesBreakdown;

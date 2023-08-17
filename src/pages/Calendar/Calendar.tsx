import { useState } from "react";
import AppointmentCard from "./components/AppointmentCard";
import AppointmentDetails from "./components/AppointmentDetails";
import moment from "moment";

interface CalendarProps {
  appointments: any[];
}

const Calendar: React.FC<CalendarProps> = ({ appointments }) => {
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const container = { display: "flex", gap: "20px", margin: "20px" };

  const today = moment().startOf("day");
  const todayAppointments = appointments.filter((appointment) => {
    const appointmentStartTime = moment(appointment.startTime);
    return appointmentStartTime.isSame(today, "day");
  });

  // const fetchData = async () => {
  //   // Citas
  //   axios
  //     .get(`http://localhost:3001/api/appointments/doctor/${doctorId}`)
  //     .then((res) => {
  //       console.log(res.data.data);
  //       const allAppointments = res.data.data;
  //       const today = moment().startOf("day");
  //       const todayAppointments = allAppointments.filter((appointment) => {
  //         const appointmentStartTime = moment(appointment.startTime);
  //         return appointmentStartTime.isSame(today, "day");
  //       });
  //       console.log(todayAppointments, "todayAppointments");
  //       console.log(todayAppointments);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "60%",
    maxWidth: "700px",
    minWidth: "350px",
    height: "500px",
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

  const appointmentsBox = {
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

  const colorScale = generateColorScale(
    "#3B6FB6",
    "#F2F2F2",
    appointments.length
  );

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  return (
    <div style={container}>
      <div style={boxStyle}>
        <div style={header}>
          <div className="text-xl font-bold justify-center items-center">
            Consultas de Hoy:{" "}
            <span className="text-red-600">{todayAppointments.length}</span>
          </div>
        </div>
        <div style={appointmentsBox}>
          {todayAppointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              startTime={moment(appointment.startTime).format("HH:mm")}
              endTime={moment(appointment.endTime).format("HH:mm")}
              title={
                appointment.service.serviceName +
                " - " +
                appointment.patient.lastName +
                ", " +
                appointment.patient.name
              }
              subtitle={appointment.address.addressName}
              circleColor={colorScale[index]}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
      {appointments && (
        <AppointmentDetails onClose={() => setSelectedCard(null)} />
      )}
    </div>
  );
};

export default Calendar;

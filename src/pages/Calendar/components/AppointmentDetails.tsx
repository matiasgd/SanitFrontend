import React from "react";
import {
  LaptopOutlined,
  CloseOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Space, Tag, Divider, Button } from "antd";
import moment from "moment";

const conteiner = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "#E7EFFA",
  height: "auto",
  width: "50%",
  minWidth: "350px",
  marginTop: "20px",
  borderRadius: "10px",
  padding: "20px",
};

const header = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const content = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const titleStyle = { color: "#222323", fontWeight: "bold", fontSize: "18px" };

const fieldStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
};

const fieldTitleStyle = {
  color: "grey",
  fontSize: "15px",
  width: "100px",
  alignItems: "flex-start",
  marginRight: "15px",
};

const fieldContentStyle = {
  display: "flex",
  color: "black",
  fontSize: "14px",
  width: "70%",
};

interface AppointmentDetailsProps {
  onClose: () => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ onClose }) => {
  return (
    <div style={conteiner}>
      <div>
        <div style={header}>
          <p style={titleStyle}>Consulta dermatologica -  Alberti, Ethan</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <p style={titleStyle}>
              {/* {moment(appointment.startTime).format("HH:mm")} -{" "}
              {moment(appointment.endTime).format("HH:mm")} */}
            </p>
            <button onClick={onClose}>
              <CloseOutlined className="flex justify-center items-center" />
            </button>
          </div>
        </div>
        <div style={content}>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}>Tipo de consulta:</p>
            <Space size={[0, 8]} wrap>
              <Tag
                icon={<LaptopOutlined />}
                className="flex justify-center items-center"
                color="#55acee"
              >
                Digital
              </Tag>
            </Space>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}>Lugar:</p>
            <p style={fieldContentStyle}>Consultorio Beruti</p>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}>Tipo de seguro:</p>
            <p style={fieldContentStyle}>Particular</p>
          </div>
          <Divider style={{ margin: "5px", backgroundColor: "#3B6FB6" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={fieldStyle}>
              <p style={fieldTitleStyle}> Ultima consulta:</p>
              <p style={{ width: "30%", fontSize: "14px" }}> 17/07/2023 </p>
            </div>
            <Button type="link">
              <Space>
                <span>Mas informacion</span>
                <ArrowRightOutlined className="flex justify-center items-center" />
              </Space>
            </Button>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Estado de pago: </p>
            <Tag>Pendiente</Tag>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Asistencia: </p>
            <p style={fieldContentStyle}>Confirmada</p>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Notas: </p>
            <p style={fieldContentStyle}>
              Vimos la relacion familiar con la madre y como le resulta jugar a
              la pelota con el hijo no reconocido de la pareja
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          gap: "10px",
        }}
      >
        <Button type="primary" style={{ backgroundColor: "#55acee" }}>
          {" "}
          Ingresar a la consulta{" "}
        </Button>
      </div>
    </div>
  );
};

export default AppointmentDetails;

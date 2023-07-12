import React from "react";
import {
  LaptopOutlined,
  HomeOutlined,
  CloseOutlined,
  IdcardOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Space, Tag, Divider, Button } from "antd";

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
  fontSize: "16px",
  width: "100px",
  alignItems: "flex-start",
  marginRight: "15px",
};

const fieldContentStyle = {
  display: "flex",
  color: "black",
  fontSize: "16px",
  width: "70%",
};

interface AppointmentDetailsProps {
  appointment: {
    startTime: string;
    endTime: string;
    title: string;
    subtitle: string;
  };
  onClose: () => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
  onClose,
}) => {
  return (
    <div style={conteiner}>
      <div>
        <div style={header}>
          <p style={titleStyle}>{appointment.title}</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <p style={titleStyle}>
              {appointment.startTime} - {appointment.endTime}
            </p>
            <button onClick={onClose}>
              <CloseOutlined className="flex justify-center items-center" />
            </button>
          </div>
        </div>
        <div style={content}>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Type </p>
            <Space size={[0, 8]} wrap>
              <Tag
                icon={<LaptopOutlined />}
                className="flex justify-center items-center"
                color="#55acee"
              >
                Digital
              </Tag>
              <Tag
                icon={<HomeOutlined />}
                className="flex justify-center items-center"
                color="#55acee"
              >
                Domicilo
              </Tag>
              <Tag
                icon={<IdcardOutlined />}
                className="flex justify-center items-center"
                color="#55acee"
              >
                Presencial
              </Tag>
            </Space>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Location </p>
            <p style={fieldContentStyle}> South Office, floor 2, room 201 </p>
          </div>
          <Divider style={{ margin: "5px", backgroundColor: "#3B6FB6" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={fieldStyle}>
              <p style={fieldTitleStyle}> Last Consult </p>
              <p style={{ width: "30%" }}> 15/08/2023 </p>
            </div>
            <Button type="link">
              <Space>
                <span>Consult Card</span>
                <ArrowRightOutlined className="flex justify-center items-center" />
              </Space>
            </Button>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Notes </p>
            <p style={fieldContentStyle}>
              Vimos la relacion familiar con la madre y como le resulta jugar a
              la pelota con el hijo no reconocido de la pareja{" "}
            </p>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Files </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "white",
                  padding: "4px 10px 5px 5px",
                  fontSize: "13px",
                  borderRadius: "5px",
                  textAlign: "center",
                  width: "auto",
                  cursor: "pointer",
                }}
              >
                <FileTextOutlined className="flex justify-center items-center ml-1 mr-2" />
                <p>Estudio de sangre</p>
              </div>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "white",
                  padding: "4px 10px 5px 5px",
                  fontSize: "13px",
                  borderRadius: "5px",
                  textAlign: "center",
                  width: "auto",
                  cursor: "pointer",
                }}
              >
                <FileTextOutlined className="flex justify-center items-center ml-1 mr-2" />
                <p>Imagen del perrito del ex</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}
      >
        <Button type="primary" style={{backgroundColor:"#55acee"}} > Ingresar a la consulta </Button>
      </div>
    </div>
  );
};

export default AppointmentDetails;

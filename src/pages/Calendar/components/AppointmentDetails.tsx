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
  selected: any;
  onClose: () => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  onClose,
  selected,
}) => {
  return (
    <div style={conteiner}>
      <div>
        <div style={header}>
          <p style={titleStyle}>
            {selected?.service?.serviceName +
              " - " +
              selected?.patient?.name +
              " " +
              selected?.patient?.lastName}
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <p style={titleStyle}>
              {moment(selected.startTime).format("HH:mm")} -{" "}
              {moment(selected.endTime).format("HH:mm")}
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
                {selected.type}
              </Tag>
            </Space>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}>Lugar:</p>
            <p style={fieldContentStyle}>{selected?.address?.addressName}</p>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}>Tipo de seguro:</p>
            <p style={fieldContentStyle}>{selected.category}</p>
          </div>
          <Divider style={{ margin: "5px", backgroundColor: "#3B6FB6" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={fieldStyle}>
              <p style={fieldTitleStyle}> Ultima consulta:</p>
              <p style={{ width: "30%", fontSize: "14px" }}>
                {" "}
                17/07/2023 HARDCODE{" "}
              </p>
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
            <Tag>{selected.paymentStatus}</Tag>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Asistencia: </p>
            <p style={fieldContentStyle}>{selected.status}</p>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Notas: </p>
            <p style={fieldContentStyle}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
              animi, dolorum quod commodi iure possimus eligendi aperiam
              aspernatur eius in at nemo tempora iste ipsum fugiat eveniet
              exercitationem quos sapiente.
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
          Ingresar a la consulta
        </Button>
      </div>
    </div>
  );
};

export default AppointmentDetails;

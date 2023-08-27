import { useState, useEffect } from "react";
import axios from "axios";
import {
  LaptopOutlined,
  CloseCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Space, Tag, Divider, Button, Input } from "antd";
import customMessage from "../../../commons/customMessage";
import PaymentModal from "../../create/PaymentModal";
import moment from "moment";
const { TextArea } = Input;

const container: React.CSSProperties = {
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

const header: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const content: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const titleStyle: React.CSSProperties = {
  color: "#222323",
  fontWeight: "bold",
  fontSize: "18px",
};

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row" as "row",
  justifyContent: "flex-start",
  alignItems: "center",
};

const fieldTitleStyle: React.CSSProperties = {
  color: "grey",
  fontSize: "15px",
  width: "100px",
  alignItems: "flex-start",
};

const fieldContentStyle: React.CSSProperties = {
  display: "flex",
  color: "black",
  fontSize: "14px",
  width: "70%",
};


interface AppointmentDetailsProps {
  selected: any;
  onClose: () => void;
}

interface AppointmentsProps {
  startTime: Date;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  onClose,
  selected,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [lastAppointment, setLastAppoitment] = useState<AppointmentsProps[]>(
    []
  );
  const [notes, setNotes] = useState("");

  const confirmAppointment = (status: String) => {
    axios
      .put(`http://localhost:3001/api/appointments/status/${selected._id}`, {
        status: status,
      })
      .then((res) => {
        const message = res.data.message;
        customMessage("success", message);
      })
      .catch((err) => {
        console.log(err);
        customMessage("error", "Algo salió mal.");
      });
  };

  const addNotes = (notes: String) => {
    axios
      .put(`http://localhost:3001/api/appointments/update/${selected._id}`, {
        notes: notes,
      })
      .then((res) => {
        customMessage("success", res.data.message);
      })
      .catch((err) => {
        console.log(err);
        customMessage("error", "Algo salió mal.");
      });
  };

  const fetchData = async () => {
    // Busqueda de appointments del paciente
    await axios
      .get(
        `http://localhost:3001/api/appointments/patient/${selected.patient._id}`
      )
      .then((res) => {
        console.log(res.data.data, "appointmentsssssss");
        setLastAppoitment(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [selected]);

  return (
    <div style={container}>
      <PaymentModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        appointment={selected}
      />
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
              <CloseCircleOutlined className="flex justify-center items-center text-2xl text-blue-500 hover:text-red-500" />
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
            <p style={fieldContentStyle}>
              {selected.category === "Union insurance"
                ? "Obra Social"
                : selected.category === "Private insurance"
                ? "Prepaga"
                : selected.category === "Without insurance"
                ? "Particular"
                : "Otros"}
            </p>
          </div>
          <Divider style={{ margin: "5px", backgroundColor: "#3B6FB6" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={fieldStyle}>
              <p style={fieldTitleStyle}> Última consulta:</p>
            </div>
            {lastAppointment.length > 1 ? (
              <p style={fieldContentStyle} className="font-bold">
                {moment(
                  (
                    lastAppointment[
                      lastAppointment.length - 2
                    ] as AppointmentsProps
                  ).startTime
                ).format("DD-MM-YYYY")}
              </p>
            ) : (
              <p style={fieldContentStyle} className="font-bold">
                Primera Consulta
              </p>
            )}

            <Button type="link">
              <Space>
                <span>Mas informacion</span>
                <ArrowRightOutlined className="flex justify-center items-center" />
              </Space>
            </Button>
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Estado de pago: </p>
            <Tag
              color={selected.paymentStatus === "Pending" ? "red" : "blue"}
              className="p-1 border-2"
            >
              {selected.paymentStatus === "Pending"
                ? "Pendiente"
                : selected.paymentStatus === "Partial"
                ? "Pago Parcial"
                : "Completado"}
            </Tag>
            {selected.paymentStatus !== "Completed" && (
              <Tag
                color="blue"
                onClick={() => setOpenModal(true)}
                className="p-1 cursor-pointer border-2 hover:border-blue-500 hover:scale-105 hover:bg-blue-100"
              >
                Cargar Pago
              </Tag>
            )}
          </div>
          <div style={fieldStyle}>
            <p style={fieldTitleStyle}> Asistencia: </p>
            <Tag
              color={selected.status === "Pending" ? "magenta" : "blue"}
              className="p-1 border-2"
            >
              {selected.status === "Pending"
                ? "Pendiente"
                : selected.status === "Canceled"
                ? "Cancelada"
                : selected.status === "Skipped"
                ? "Ausente sin aviso"
                : "Atendido/a"}
            </Tag>
            {selected.status === "Pending" && (
              <select
                style={{
                  display: "inline-block",
                  padding: "0 15px",
                  fontSize: "14px",
                  height: "32px",
                  lineHeight: "30px",
                  whiteSpace: "nowrap",
                  border: "1px solid #1890ff",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition:
                    "background-color 0.3s ease, border-color 0.3s ease",
                }}
                id="asistencia"
                name="asistencia"
                onChange={(e) => confirmAppointment(e.target.value)}
              >
                <option value="">Seleccione una opción</option>
                <option value="Completed">Atendido/a</option>
                <option value="Canceled">Cancelada</option>
                <option value="Skipped">No vino</option>
              </select>
            )}
          </div>
          <div style={fieldStyle} className="gap-4">
            <p style={fieldTitleStyle}> Notas: </p>
            {selected.notes !== null ? (
              <p style={fieldContentStyle}>{selected.notes}</p>
            ) : (
              <>
                <TextArea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    "Aquí puedes escribir notas relevantes a esta consulta..."
                  }
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  className="w-[60%]"
                />
                <Tag
                  color="blue"
                  onClick={() => addNotes(notes)}
                  className="p-1 cursor-pointer border-2 hover:border-blue-500 hover:scale-105 hover:bg-blue-100"
                >
                  Guardar Nota
                </Tag>
              </>
            )}
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

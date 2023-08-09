import React, { useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import Prices from "../Me/prices/Prices";
import PricesForm from "../Me/prices/components/PricesForm";

const { Option } = Select;

interface IService {
  Nombre: string;
  Categoria: string;
  DuracionMinutos: number;
  DuracionHoras: number;
}

interface ServiceProps {
  service: IService;
}

const fieldStyle = {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const fullfieldStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const labelStyle = { fontSize: "13px", color: "#888888" };

const inputStyle = {
  width: "100%",
  border: "1px solid #CDCFD3",
  borderRadius: "5px",
  padding: "10px",
  height: "32.5px",
};

const Service: React.FC<ServiceProps> = ({ service }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleButtonClick = (title: string) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div style={fullfieldStyle}>
        <h3 style={labelStyle}>Nombre</h3>
        <Input value={service.Nombre} style={inputStyle} />
      </div>
      <div style={{ display: "flex", gap: "15px" }}>
        <div style={fieldStyle}>
          <h3 style={labelStyle}>Categoria</h3>
          <Select defaultValue={service.Categoria} style={{ width: "100%" }}>
            <Option value="Medicina general">Medicina general</Option>
            <Option value="Psicologia">Psicologia</Option>
            <Option value="Psiquiatria">Psiquiatria</Option>
            <Option value="Cardiología">Cardiología</Option>
            <Option value="Dermatología">Dermatología</Option>
          </Select>
        </div>
        <div style={fieldStyle}>
          <h3 style={labelStyle}>Duración ( hh : mm )</h3>
          <div style={{ display: "flex", gap: "15px" }}>
            <Input value={service.DuracionHoras} type="number" />
            <Input value={service.DuracionMinutos} type="number" />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "15px",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Button style={{ width: "200px" }}
        onClick={() => handleButtonClick("Prices")}>(+) Nuevo precio</Button>
        <Prices/>
      </div>

      <Modal
        title={modalTitle}
        visible={modalVisible}
        onCancel={closeModal}
        onOk={closeModal}
      >
        {modalTitle === "Prices" && <PricesForm />}
      </Modal>
    </div>
  );
};

Service.defaultProps = {
  service: {
    Nombre: "Consulta médica",
    Categoria: "Medicina general",
    DuracionMinutos: 30,
    DuracionHoras: 1,
  },
};

export default Service;

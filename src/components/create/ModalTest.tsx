import React, { useState } from "react";
import { Button, Modal } from "antd";
import GenericModal from "./GenericModal";
import PatientForm from "./PatientForm";
import AddressForm from "./AddressForm";

const ModalTest: React.FC = () => {
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
    <div style={{ margin: "auto", textAlign: "center" }}>
      <Button
        style={{ margin: "8px" }}
        onClick={() => handleButtonClick("New Patient")}
      >
        New Patient
      </Button>
      <Button
        style={{ margin: "8px" }}
        onClick={() => handleButtonClick("New Direction")}
      >
        New Direction
      </Button>
      <Button
        style={{ margin: "8px" }}
        onClick={() => handleButtonClick("New Service")}
      >
        New Service
      </Button>
      <Button
        style={{ margin: "8px" }}
        onClick={() => handleButtonClick("New Consult")}
      >
        New Consult
      </Button>
      <Button
        style={{ margin: "8px" }}
        onClick={() => handleButtonClick("New Payment")}
      >
        New Payment
      </Button>

      <Modal
        title={modalTitle}
        visible={modalVisible}
        onCancel={closeModal}
        onOk={closeModal}
      >
        {modalTitle === "New Patient" && <PatientForm />}
        {modalTitle === "New Direction" && <AddressForm />}
      </Modal>
    </div>
  );
};

export default ModalTest;

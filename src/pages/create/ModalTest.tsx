import React, { useState } from "react";
import { Button, Modal } from "antd";
import PatientForm from "./PatientForm";
import AddressForm from "./AddressForm";
import PatientModal from "./PatientModal";

const ModalTest: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [isOpen, setOpen] = useState(false);

  const handleButtonClick = (title: string) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <PatientModal isOpen={isOpen} onClose={() => setOpen(false)} />
      <button type="button" onClick={() => setOpen(true)}>
        Modal
      </button>
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

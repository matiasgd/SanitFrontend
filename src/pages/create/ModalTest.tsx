import React, { useState } from "react";
import { Button, Modal } from "antd";
import Sidebar from "../Me/Sidebar";
import AddressForm from "./AddressForm";
import ServiceForm from "../services/Service";
import PatientModal from "./PatientModal";
import AppointmentsModal from "./AppointmentsModal";

const ModalTest: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isOpenPatientsModal, setOpenPatientsModal] = useState(false);
  const [isOpenAppointmentsModal, setIsOpenAppointmentsModal] = useState(false);

  const handleButtonClick = (title: string) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <div>
        <PatientModal
          isOpen={isOpenPatientsModal}
          onClose={() => setOpenPatientsModal(false)}
        />
        <AppointmentsModal
          isOpen={isOpenAppointmentsModal}
          onClose={() => setOpenPatientsModal(false)}
        />
        <Button
          style={{ margin: "8px" }}
          onClick={() => setOpenPatientsModal(true)}
        >
          Nuevo paciente
        </Button>
        <Button onClick={() => setIsOpenAppointmentsModal(true)}>
          Nuevo turno
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
          open={modalVisible}
          onCancel={closeModal}
          onOk={closeModal}
        >
          {modalTitle === "New Direction" && <AddressForm />}
          {modalTitle === "New Service" && <ServiceForm />}
        </Modal>
      </div>
    </div>
  );
};

export default ModalTest;

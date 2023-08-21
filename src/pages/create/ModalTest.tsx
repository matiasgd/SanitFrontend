import React, { useState } from "react";
import { Button } from "antd";
import PatientModal from "./PatientModal";
import AppointmentsModal from "./AppointmentsModal";
import AddressModal from "./AddressModal";
import ServiceModal from "./ServiceModal";
import PaymentModal from "./PaymentModal";

const ModalTest: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isOpenPatientsModal, setOpenPatientsModal] = useState(false);
  const [isOpenAppointmentsModal, setIsOpenAppointmentsModal] = useState(false);
  const [isOpenAddressModal, setIsOpenAddressModal] = useState(false);
  const [isOpenAddressForm, setIsOpenAddressForm] = useState(false);
  const [isOpenServiceModal, setIsOpenServiceModal] = useState(false);
  const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);

  const handleButtonClick = (title: string) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <PatientModal
        isOpen={isOpenPatientsModal}
        onClose={() => setOpenPatientsModal(false)}
      />
      <AppointmentsModal
        isOpen={isOpenAppointmentsModal}
        onClose={() => setIsOpenAppointmentsModal(false)}
      />
      <AddressModal
        isOpen={isOpenAddressModal}
        onClose={() => setIsOpenAddressModal(false)}
      />
      <ServiceModal
        isOpen={isOpenServiceModal}
        onClose={() => setIsOpenServiceModal(false)}
        type="CREATE"
      />
      <PaymentModal
        isOpen={isOpenPaymentModal}
        onClose={() => setIsOpenPaymentModal(false)}
      />

      <Button
        style={{ margin: "8px" }}
        onClick={() => setOpenPatientsModal(true)}
      >
        Nuevo paciente
      </Button>
      <Button
        style={{ margin: "8px" }}
        onClick={() => setIsOpenAppointmentsModal(true)}
      >
        Nuevo turno
      </Button>
      <Button
        style={{ margin: "8px" }}
        onClick={() => setIsOpenAddressModal(true)}
      >
        Nuevo consultorio
      </Button>
      <Button
        style={{ margin: "8px" }}
        onClick={() => setIsOpenServiceModal(true)}
      >
        Nuevo servicio
      </Button>
      <Button
        style={{ margin: "8px" }}
        onClick={() => setIsOpenPaymentModal(true)}
      >
        Nuevo pago
      </Button>
    </div>
  );
};

export default ModalTest;

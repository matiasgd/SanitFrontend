import { Button } from "antd";
//import AddressForm from "./AddressForm";
import PatientForm from "./PatientForm";

const GenericModal = () => {
  const handleCancel = () => {
    console.log("Cancelado");
  };

  const handleSaveNew = () => {
    console.log("Guardado y nuevo");
  };

  const handleSave = () => {
    console.log("Guardado");
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    margin: "auto",
    alignItems: "center",
    borderRadius: "10px",
    width: "35%",
    height: "fit-content",
    border: "1px solid #E7EFFA",
    backgroundColor: "white",
  };

  const headerStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    padding: "10px 20px",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E7EFFA",
    borderRadius: "10px 10px 0 0",
    width: "100%",
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#848282",
        width: "100%",
        height: "100vh",
      }}
    >
      <div style={containerStyle}>
        <div style={headerStyle}>
          <p>Nuevo ...</p>
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "40px",
            gap: "20px",
            width: "100%",
          }}
        >
          <PatientForm />
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            gap: "5px",
          }}
        >
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleSaveNew}>Guardar y Nuevo</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;

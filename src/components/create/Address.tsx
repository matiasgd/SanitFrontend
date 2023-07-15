import { Button } from "antd";
import { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AddressForm = () => {
  let user = useSelector((state: RootState) => state.user);
  const doctorId = user.id;

  interface AddressState {
    street: string;
    number: string;
    floor: string;
    addressType: string;
    webAddress: string;
    houseApartment: string;
    province: string;
    country: string;
    city: string;
    zipCode: string;
  }

  interface ChangeEvent<T> {
    target: T;
  }
  
  interface ValueType {
    value: string ;
  }

  const [address, setAddress] = useState<AddressState>({
    street: '',
    number: '',
    floor: '',
    addressType: '', 
    webAddress: '',
    houseApartment: '',
    province: '',
    country: '',
    city: '',
    zipCode: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  
  const handleAddressTypeChange = (value: ValueType['value']) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      addressType: value,
    }));
  };
    

  const handleSelectChange = (name: keyof AddressState, value: string) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    // Lógica para cancelar
    console.log("Cancelado");
  };

  const handleSaveNew = () => {
    // Lógica para guardar y crear nuevo
    Axios.post(
      `http://localhost:3001/api/address/new/doctor/${doctorId}`,
      address
    )
      .then((res) => {
        console.log(`http://localhost:3001/api/address/new/doctor/${doctorId}`);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = () => {
    // Lógica para guardar y crear nuevo
    Axios.post(
      `http://localhost:3001/api/address/new/doctor/${doctorId}`,
      address
    )
      .then((res) => {
        console.log(`http://localhost:3001/api/address/new/doctor/${doctorId}`);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const container = {
    display: "flex",
    flexDirection: "column" as const,
    margin: "auto",
    alignItems: "center",
    borderRadius: "10px",
    width: "35%",
    height: "fit-content",
    border: "1px solid #E7EFFA",
    backgroundColor: "white",
  };

  const header = {
    display: "flex",
    flexDirection: "column" as const,
    padding: "10px 20px",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E7EFFA",
    borderRadius: "10px 10px 0 0",
    width: "100%",
  };

  const fieldStyle = {
    width: "50%",
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
  };

  const labelStyle = { fontSize: "13px", color: "#888888" };

  const inputStyle = {
    width: "100%",
    border: "1px solid #CDCFD3",
    borderRadius: "5px",
    padding: "5px",
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
      <div style={container}>
        <div style={header}>
          <p>Nueva dirección</p>
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
          <div style={fieldStyle}>
            <label style={labelStyle}>Tipo de dirección</label>
            <select
              id="addressType"
              name="addressType"
              value={address.addressType}
              onChange={(e) => handleAddressTypeChange(e.target.value)}
              style={inputStyle}
            >
              <option value="">Seleccionar</option>
              <option value="fisica">Física</option>
              <option value="digital">Digital</option>
            </select>
          </div>
          {address.addressType === "fisica" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div style={fieldStyle}>
                <label style={labelStyle}>País</label>
                <input
                  id="country"
                  name="country"
                  value={address.country}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Provincia</label>
                  <input
                    id="province"
                    name="province"
                    value={address.province}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Localidad</label>
                  <input
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Calle</label>
                  <input
                    id="street"
                    name="street"
                    value={address.street}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Número</label>
                  <input
                    id="number"
                    name="number"
                    value={address.number}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Casa/Departamento</label>
                  <select
                    id="houseApartment"
                    name="houseApartment"
                    value={address.houseApartment}
                    onChange={(e) =>
                      handleSelectChange("houseApartment", e.target.value)
                    }
                    style={inputStyle}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Piso/Letra</label>
                  <input
                    id="floor"
                    name="floor"
                    value={address.floor}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Código Postal</label>
                <input
                  id="zipCode"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
            </div>
          )}
          {address.addressType === "digital" && (
            <>
              <label style={labelStyle}>Dirección web</label>
              <input
                id="webAddress"
                name="webAddress"
                value={address.webAddress}
                onChange={handleInputChange}
                style={inputStyle}
              />
            </>
          )}
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

export default AddressForm;

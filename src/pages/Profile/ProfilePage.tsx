import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Sidebar from "../Me/Sidebar";
import { Button } from "antd";
import AddressModal from "../create/AddressModal";
import ServiceModal from "../create/ServiceModal";
import ServicesBreakdown from "./ServicesBreakdown";
import logo from "./profile.avif";
import Modal from "../../commons/Modal";
import Stepper from "../Me/components/Stepper";

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<any>([]);
  const [services, setServices] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [isOpenAddressModal, setIsOpenAddressModal] = useState(false);
  const [isOpenServiceModal, setIsOpenServiceModal] = useState(false);
  const [userModal, setUserModal] = useState(false);

  const getUser = async () => {
    // Get user Info
    await axios
      .get(`${import.meta.env.VITE_API_ROUTE}/api/users/${user.id}`)
      .then((user) => {
        setUserData(user.data.user);
      })
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    // services
    await axios
      .get(`${import.meta.env.VITE_API_ROUTE}/api/services/user/${user.id}`)
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((err) => console.log(err));

    // addresses
    await axios
      .get(`${import.meta.env.VITE_API_ROUTE}/api/addresses/doctor/${user.id}`)
      .then((res) => {
        setAddresses(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user?.id) {
      getUser();
      fetchData();
    }
  }, [user]);

  return (
    <div className="flex p-4">
      <Modal
        isOpen={userModal}
        onClose={() => {
          setUserModal(false);
          fetchData();
        }}
      >
        <Stepper />
      </Modal>

      <AddressModal
        isOpen={isOpenAddressModal}
        onClose={() => {
          setIsOpenAddressModal(false);
          fetchData();
        }}
      />

      <ServiceModal
        addressData={addresses}
        isOpen={isOpenServiceModal}
        onClose={() => {
          setIsOpenServiceModal(false);
          fetchData();
        }}
        type="CREATE"
      />

      <Sidebar />

      <div className="flex w-full rounded-md p-4 flex-row items-start ml-2 shadow-lg">
        <div className="flex flex-col w-full rounded-md p-4 items-center m-5">
          <p className="font-bold text-lg text-center mb-4">
            ¡Hola, {userData.name}!
          </p>
          <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full bg-blue-300 m-4">
            <img src={logo} />
          </div>
          <div className="flex flex-row items-start justify-center gap-3">
            <Button
              onClick={() => setUserModal(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex justify-center items-center"
            >
              Modificar datos
            </Button>
            <Button
              onClick={() => setIsOpenAddressModal(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex justify-center items-center"
            >
              Crear consultorios
            </Button>
            <Button
              onClick={() => setIsOpenServiceModal(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex justify-center items-center"
            >
              Crear servicios
            </Button>
          </div>
          <div className="flex flex-row items-start justify-center gap-3 p-5">
            <label className="flex justify-center items-center text-sm font-bold ">
              Selecciona tu consultorio:
            </label>
            <select
              style={{
                display: "inline-block",
                padding: "0 15px",
                fontSize: "14px",
                height: "32px",
                lineHeight: "30px",
                whiteSpace: "nowrap",
                border: "1px solid blue",
                borderRadius: "4px",
                cursor: "pointer",
                transition:
                  "background-color 0.3s ease, border-color 0.3s ease",
              }}
              id="addressSelect"
              onChange={(e) => setSelectedAddress(e.target.value)}
              value={selectedAddress}
            >
              <option value="">Tus consultorios</option>
              {addresses.map((address:any) => (
                <option key={address._id} value={address._id}>
                  {address.addressName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-start justify-start gap-3">
            <ServicesBreakdown
              services={
                selectedAddress
                  ? services.filter(
                      (service:any) => service.address === selectedAddress
                    )
                  : services
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

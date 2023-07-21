import Sidebar from "./Sidebar";
import Patient from "./components/Patient";
import ClinicalHistory from "./components/ClinicalHistory";
import PatientApointments from "./components/PatientAppointments";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginLeft: "20px",
            }}
          >
            <Patient />
            <div style={{ display: "flex" }}>
              <div style={{ flex: "2" }}>
                <ClinicalHistory />
              </div>
              <div style={{ flex: "1", marginLeft: "20px" }}>
                <div>
                  <PatientApointments />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <PatientApointments />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

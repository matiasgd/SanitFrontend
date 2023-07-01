import React from "react";
import Sidebar from "./Sidebar";
import Patient from "./Patient";
import ClinicalHistory from "./ClinicalHistory";
import PatientApointments from "./PatientAppointments";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flexGrow: 0 }}>
          <Sidebar />
        </div>
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
            <div style= {{display: "flex"}}>
              <div style= {{flex: "2"}}>
                <ClinicalHistory />
              </div>
              <div style= {{flex: "1", marginLeft:"20px"}}>
                <div>
                <PatientApointments />
                </div>
                <div style={{ marginTop:"20px"}}>
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

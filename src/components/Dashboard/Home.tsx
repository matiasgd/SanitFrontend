import React from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import Patients from "./Patients";

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div>
        <SearchBar />
        <div style={{marginTop:"20px"}}>
          <Patients />
        </div>
      </div>
    </div>
  );
};

export default Home;

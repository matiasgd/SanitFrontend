import React from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import Patient from "./Patient";

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div>
        <SearchBar />
        <div style={{marginTop:"20px"}}>
          <Patient/>
        </div>
      </div>
    </div>
  );
};

export default Home;

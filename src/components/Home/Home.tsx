import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import OurTeam from "./OurTeam";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <OurTeam />
    </div>
  );
};

export default Home;

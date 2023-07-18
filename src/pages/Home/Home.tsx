import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import OurTeam from "./components/OurTeam";

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

import React from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import OurTeam from "./components/OurTeam";
import Parallax from "./components/Parallax";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Parallax />
      <OurTeam />
    </div>
  );
};

export default Home;

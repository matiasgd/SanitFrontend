import Navbar from "./components/Navbar";
import OurTeam from "./components/OurTeam";
import Parallax from "./components/Parallax";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Parallax />
      <OurTeam />
    </div>
  );
};

export default Home;

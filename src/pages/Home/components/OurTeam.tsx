import members from "../../../constans/members";
import FlipCard from "./FlipCard";

const OurTeam: React.FC = () => {
  return (
    <div className="xl:ml-20 mr-20 sm:px-16 px-6 sm:py-16 py-10">
      <p className="text-center text-secondary font-black text-4xl">
        Nuestro Equipo
      </p>
      <h3 className="mt-5 text-md font-bold text-center">
        Somos un equipo interdisciplinario de médicos, profesionales de salud y
        de tecnología con más de 10 años de experiencia en desarrollo de
        servicios digitales.
      </h3>
      <div className="mt-8 flex flex-wrap justify-center gap-10 ">
        {members.map((member, i) => (
          <FlipCard
            key={i}
            name={member.name}
            title={member.title}
            image={member.imagePath}
            description={member.description}
            linkedin={member.linkedin}
            github={member.github}
            resume={member.resume}
          />
        ))}
      </div>
    </div>
  );
};

export default OurTeam;

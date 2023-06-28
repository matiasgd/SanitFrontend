import React from "react";
import ProfileCard from "../../commons/ProfileCard";
import members from "../../constans/members";

const MyComponent: React.FC = () => {

  return (
    <div className=" xl:ml-20 mr-20 sm:px-16 px-6 sm:py-16 py-10">
      <h2 className="text-center text-black font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]"> Nuestro Equipo</h2>
      <h3 className="mt-2 text-secondary text-[17px]  leading-[30px] text-center">
        Somos un equipo interdisciplinario de médicos, profesionales de salud y
        de tecnología con más de 10 años de experiencia en desarrollo de
        servicios digitales.
      </h3>
      <div className="mt-20 flex flex-wrap  justify-center gap-10 ">
        {members.map((member) => (
          <ProfileCard
            name={member.name}
            title={member.title}
            imagePath={member.imagePath}
            description={member.description}
          />
        ))}
      </div>
    </div>
  );
};

export default MyComponent;

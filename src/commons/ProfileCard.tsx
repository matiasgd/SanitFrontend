import React from "react";

interface CommonCardProps {
  name: string;
  imagePath: string;
  title: string;
  description: string;
}

const ProfileCard: React.FC<CommonCardProps> = ({
  name,
  title,
  imagePath,
  description,
}) => {
  return (
    <div className="bg-[#ECF3FC] p-5 rounded-2xl sm:w-[300px] w-full cursor-pointer justify-center items-center">
      <h2 className="text-[#EB6350] font-bold text-lg justify-center text-center">
        {name}
      </h2>
      <p className="font-semibold mt-2 text-secondary text-[14px] text-center">
        {title}
      </p>
      <div className="flex justify-center items-center mt-2">
        <div>
          <div
            style={{
              backgroundColor: "white",
              width: "7rem",
              height: "7rem",
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
            className="border-2 border-[#2AAAE1]"
          >
            <img
              src={imagePath}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <p className="mt-2 text-secondary text-[14px] text-center">
        {description}
      </p>
    </div>
  );
};

export default ProfileCard;

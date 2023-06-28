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
    <div
    className="bg-tertiary p-5 rounded-2xl sm:w-[300px] w-full cursor-pointer justify-center items-center"
      style={{
        backgroundColor: "#ECF3FC",
      }}
    >
      <h2 style={{ color: "blue", fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}>
        {name}
      </h2>
      <h3 style={{ color: "black", fontSize: "1.2rem", textAlign: "center" }}>
        {title}
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
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
          >
            <img
              src={imagePath}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <p style={{ color: "gray", marginTop: "1rem" }}>{description}</p>
    </div>
  );
};

export default ProfileCard;

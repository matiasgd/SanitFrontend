import { Tooltip } from "antd";
import {
  LinkedinOutlined,
  GithubOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";

interface FlipCardProps {
  name: string;
  image: string;
  title: string;
  description: string;
  linkedin: string;
  github: string;
  resume: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  name,
  image,
  title,
  description,
  linkedin,
  github,
  resume,
}) => {
  return (
    <div className="w-[300px] h-96 cursor-pointer bg-transparent group perspective">
      <div className="relative preserve-3d group-hover:rotate-y-180 w-full h-full duration-1000">
        <div className="absolute flex flex-col gap-2 backface-hidden bg-blue-50 border-4 border-secondary w-full h-full rounded-3xl p-6">
          <p className="text-primary font-bold text-lg justify-center text-center">
            {name}
          </p>
          <p className="font-bold text-sm text-center text-secondary">
            {title}
          </p>
          <div className="border-4 border-blue-400 rounded-full">
            <img
              src={image}
              alt={name}
              className="rounded-full w-[300px] h-[240px]"
            />
          </div>
        </div>
        <div className="absolute backface-hidden rotate-y-180 w-full h-full bg-secondary  overflow-hidden rounded-3xl">
          <div className="flex flex-col justify-around items-center text-center h-full px-4">
            <p className="font-semibold text-white">{description}</p>
            <div className="flex justify-between gap-8 -bottom-20 delay-500 duration-1000 group-hover:bottom-20 scale-0 group-hover:scale-125">
              <Tooltip title="Conectar" placement="top" color="#60A5FA">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-blue-400"
                >
                  <LinkedinOutlined className="text-3xl mt-2" />
                </a>
              </Tooltip>
              {github !== "" ? (
                <Tooltip title="Github" placement="top" color="#C13584">
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:text-[#C13584]"
                  >
                    <GithubOutlined className="text-3xl mt-2" />
                  </a>
                </Tooltip>
              ) : (
                ""
              )}
              <Tooltip title="Descargar CV" placement="top" color="#EB6350">
                <a
                  href={resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-primary"
                >
                  <PaperClipOutlined className="text-3xl mt-2" />
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

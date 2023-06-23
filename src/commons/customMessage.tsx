import { message } from "antd";
const customMessage = (type: string, content: string) => {
  message.config({
    duration: 4,
  });

  if (type === "success") {
    message.success(content);
  } else if (type === "error") {
    message.error(content);
  } else if (type === "info") {
    message.info(content);
  } else if (type === "warning") {
    message.warning(content);
  }
};

export default customMessage;

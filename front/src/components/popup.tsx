import { Link } from "react-router-dom";

export interface IMessage {
  type: "SUCCESS" | "ERROR";
  text: string;
  id?: number;
  email?: string;
}

interface IPopupProps {
  message?: IMessage;
}

const Popup = ({ message }: IPopupProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed right-10 bottom-10 p-3 text-3xl rounded-2xl${
        message.type === "ERROR" ? " bg-red-600" : " bg-emerald-400"
      }`}
    >
      <span>
        {message.text} {message.email}{" "}
      </span>
      {message.id && (
        <Link to={`/unsubscribe?id=${message.id}`} className="text-red-500">
          Unsubscribe
        </Link>
      )}
    </div>
  );
};

export default Popup;

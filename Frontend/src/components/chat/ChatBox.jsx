import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetch";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage, messagesError } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");

  //Scrolling down to the last word of the chat
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!recipientUser) return <p className="text-center w-full">No conversation selected yet...</p>;
  if (isMessagesLoading) return <p className="text-center w-full">Loading chats...</p>;

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-center p-3 bg-gray-700">
        <h3 className="font-bold text-lg">{recipientUser?.data?.username}</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-[80%] p-3 rounded-lg ${
                message?.senderId === user?.data._id ? "bg-teal-500 ml-auto" : "bg-gray-600"
              }`}
              ref={scroll}
            >
              <span className="text-white">{message?.text}</span>
              <span className="text-xs text-gray-300 self-end mt-1">
                {moment(message.createdAt).calendar()}
              </span>
            </div>
          ))}
      </div>
      <div className="flex items-center gap-2 p-4 bg-gray-700">
        <div className="flex-1">
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            fontFamily="nunito"
            borderColor="rgba(72, 112, 223, 0.2)"
          />
        </div>
        <button
          onClick={() => sendTextMessage(textMessage, user?.data, currentChat._id, setTextMessage)}
          className="bg-blue-600 h-10 w-10 border-none rounded-full items-center flex justify-center hover:bg-blue-500 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

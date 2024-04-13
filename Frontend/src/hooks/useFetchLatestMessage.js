import { useContext, useState, useEffect } from "react";
import { getRequest } from "../utils/services";
import { ChatContext } from "../context/ChatContext";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessgae] = useState(null);

//   console.log("latestMessage", latestMessage);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`/messages/${chat?._id}`);
    //   console.log("response", response);
      if (response.error) {
        return console.log("Error fetching messages...", error);
      }
      const lastMessage = response[response?.length - 1];
      setLatestMessgae(lastMessage);
    };
    getMessages();
  }, [newMessage, notifications]);

  return { latestMessage };
};

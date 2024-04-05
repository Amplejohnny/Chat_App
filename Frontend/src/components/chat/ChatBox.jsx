import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetch";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
//   console.log("User", user);
  const { currentChat, messages, isMessagesLoading, messagesError } = useContext(ChatContext);
//   console.log("Current Chat", currentChat);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
//   console.log("User", user);
//   console.log("Recipient User", recipientUser);
  if (!recipientUser?.data) return <p className="text-center w-full">No conversation selected yet...</p>;
  return <>Chatbox</>;
};

export default ChatBox;

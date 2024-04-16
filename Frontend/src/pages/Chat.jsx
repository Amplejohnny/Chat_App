import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import OnlineChat from "../components/chat/OnlineChat";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat, userChatError } = useContext(ChatContext);

  // Check if userChats is null before sorting
  const sortedChats = userChats && userChats.slice().sort((a, b) => {
    const latestMessageA = a.latestMessage;
    const latestMessageB = b.latestMessage;

    // If one chat has no latest message, prioritize the other one
    if (!latestMessageA && latestMessageB) return 1;
    if (latestMessageA && !latestMessageB) return -1;

    // If both chats have no latest message, prioritize based on other factors
    if (!latestMessageA && !latestMessageB) {
      // For example, you can prioritize based on chat creation time
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    // Sort based on the latest message's timestamp
    return new Date(latestMessageB.createdAt) - new Date(latestMessageA.createdAt);
  });

  return (
    <Container>
      <OnlineChat />
      {sortedChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="d-flex align-items-start">
          <Stack className="messages-box pe-3 flex-grow-0" gap={3}>
            {isUserChatsLoading && <p>Loading Chats...</p>}
            {sortedChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;

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

  // console.log("userChats", userChats);
  return (
    <Container>
      <OnlineChat />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="d-flex align-items-start">
          <Stack className="messages-box pe-3 flex-grow-0" gap={3}>
            {isUserChatsLoading && <p>Loading Chats...</p>}
            {userChats?.map((chat, index) => {
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

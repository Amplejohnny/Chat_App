import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import OnlineChat from "../components/chat/OnlineChat";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat, userChatError } =
    useContext(ChatContext);

  return (
    <div className="w-full">
      <OnlineChat />
      {userChats?.length < 1 ? null : (
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="w-full lg:w-96 lg:flex-shrink-0 lg:pe-3">
            <div className="space-y-3">
              {isUserChatsLoading && <p className="text-center">Loading Chats...</p>}
              {userChats?.map((chat, index) => {
                return (
                  <div key={index} onClick={() => updateCurrentChat(chat)}>
                    <UserChat chat={chat} user={user} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1 w-full">
            <ChatBox />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;

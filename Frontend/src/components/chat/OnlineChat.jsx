import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const OnlineChat = () => {
  const { user } = useContext(AuthContext);
  const { onlineUserChats, createChat } = useContext(ChatContext);
  //   console.log("onlineUserChatAll", onlineUserChats);
  return (
    <>
      <div className="all-users">
        {onlineUserChats &&
          onlineUserChats.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => createChat(user?.data._id, u._id)}
              >
                {u.username}
                <span className="user-online"></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default OnlineChat;

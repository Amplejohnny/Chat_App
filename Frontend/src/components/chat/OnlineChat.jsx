import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const OnlineChat = () => {
  const { user } = useContext(AuthContext);
  const { onlineUserChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2">
      {onlineUserChats &&
        onlineUserChats.map((u, index) => {
          return (
            <div
              className="relative bg-cyan-500 cursor-pointer px-3 py-2 rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors"
              key={index}
              onClick={() => createChat(user?.data._id, u._id)}
            >
              {u.username}
              {onlineUsers?.some((user) => user?.userId === u?._id) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default OnlineChat;

import { useFetchRecipientUser } from "../../hooks/useFetch";
import avatar from "../../assets/Avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markParticularAsRead } = useContext(ChatContext);
  const { latestMessage } = useFetchLatestMessage(chat);

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const particularUserNotification = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?.data?._id
  );
  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?.data?._id);

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };

  return (
    <div
      className="flex items-center justify-between p-2 border-b border-gray-600 cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={() => {
        if (particularUserNotification?.length > 0) {
          markParticularAsRead(particularUserNotification, notifications);
        }
      }}
    >
      <div className="flex items-center">
        <div className="relative mr-2">
          <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
          {isOnline && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
          )}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="font-semibold text-white truncate">{recipientUser?.data?.username}</div>
          <div className="text-sm text-gray-400 truncate">
            {latestMessage?.text && <span>{truncateText(latestMessage?.text)}</span>}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-xs text-gray-400">{moment(latestMessage?.createdAt).calendar()}</div>
        {particularUserNotification?.length > 0 && (
          <div className="bg-teal-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-1">
            {particularUserNotification?.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChat;

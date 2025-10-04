import { useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { notifications, userChats, allUsers, markAllAsRead, markAsRead } = useContext(ChatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const notificationWithSender = notifications.map((n) => {
    const sender = allUsers.find((user) => user?._id === n.senderId);
    return { ...n, senderName: sender?.username };
  });

  return (
    <div className="relative">
      <div
        className="relative cursor-pointer p-2 hover:bg-gray-700 rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-chat-fill text-white"
          viewBox="0 0 16 16"
        >
          <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
        </svg>
        {unreadNotifications?.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadNotifications?.length}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-12 right-0 w-80 max-h-96 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-600">
            <h3 className="text-white font-semibold">Notifications</h3>
            <button
              onClick={() => markAllAsRead(notifications)}
              className="text-teal-400 hover:text-teal-300 text-sm font-medium"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notificationWithSender?.length === 0 ? (
              <div className="p-4 text-gray-400 text-center">No notification yet...</div>
            ) : (
              notificationWithSender.map((n, index) => {
                return (
                  <div
                    key={index}
                    className={`p-3 border-b border-gray-600 cursor-pointer hover:bg-gray-700 transition-colors ${
                      !n.isRead ? "bg-gray-700" : ""
                    }`}
                    onClick={() => {
                      markAsRead(n, userChats, user, notifications);
                      setIsOpen(false);
                    }}
                  >
                    <div className="text-white text-sm">
                      {`${n.senderName} sent you a new message`}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{moment(n.date).calendar()}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default notification;

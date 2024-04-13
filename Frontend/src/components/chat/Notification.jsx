import { useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";

const notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { notifications, userChats, allUsers, markAllAsRead, markAsRead } = useContext(ChatContext); //allUsers not there

  const unreadNotifications = unreadNotificationsFunc(notifications);
  //   console.log("allUsers", allUsers);
  //   console.log("notifications", notifications)
  // console.log("unreadNotifications", unreadNotifications)
  const notificationWithSender = notifications.map((n) => {
    const sender = allUsers.find((user) => user?._id === n.senderId);
    return { ...n, senderName: sender?.username };
  });

  //   console.log("unreadNotifications", unreadNotifications);
  //   console.log("notificationWithSender", notificationWithSender);

  return (
    <div className="notifications flex">
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-chat-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
        </svg>
        {unreadNotifications?.length === 0 ? null : (
          <span className="notification-count">
            <span>{unreadNotifications?.length}</span>
          </span>
        )}
      </div>
      {isOpen ? (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div onClick={() => markAllAsRead(notifications)} className="mark-as-read">
              Mark all as read
            </div>
          </div>
          {notificationWithSender?.length === 0 ? (
            <span className="notification">No notification yet...</span>
          ) : null}
          {notificationWithSender &&
            notificationWithSender.map((n, index) => {
              return (
                <div
                  key={index}
                  className={n.isRead ? "notification" : "notification not-read"}
                  onClick={() => {
                    markAsRead(n, userChats, user, notifications);
                    setIsOpen(false);
                  }}
                >
                  <span>{`${n.senderName} sent you a new message`}</span>
                  <span className="notification-time">{moment(n.date).calendar()}</span>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default notification;

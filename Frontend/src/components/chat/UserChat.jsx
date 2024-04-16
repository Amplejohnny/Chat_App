import { Stack } from "react-bootstrap";
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
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between cursor-pointer"
      onClick={() => {
        if (particularUserNotification?.length > 0) {
          markParticularAsRead(particularUserNotification, notifications);
        }
      }}
    >
      <div className="d-flex ">
        <div className="me-2">
          <img src={avatar} alt="Avatar" className="avatar-img" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.data?.username}</div>
          <div className="text">
            {latestMessage?.text && <span>{truncateText(latestMessage?.text)}</span>}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {moment(latestMessage?.createdAt).calendar(null, {
            lastDay: "[Yesterday]",
            sameDay: "[Today]",
            lastWeek: "dddd",
          })}
        </div>
        <div className={particularUserNotification?.length > 0 ? "this-user-notifications" : ""}>
          {particularUserNotification?.length > 0 ? particularUserNotification?.length : ""}
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;

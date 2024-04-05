import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetch";
import avatar from "../../assets/Avatar.svg";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  //   console.log("recipientUser", recipientUser);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between cursor-pointer"
    >
      <div className="d-flex ">
        <div className="me-2">
          <img src={avatar} alt="Avatar" className="avatar-img" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.data?.username}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">{new Date(chat?.updatedAt).toLocaleDateString()}</div>
        <div className="this-user-notifications">2</div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
};

export default UserChat;

import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatError, setUserChatError] = useState(null);
  const [onlineUserChats, setOnlineUserChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  // console.log("currentChat", currentChat);
  // console.log("messages", messages);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest("/auth/users");
      if (response.error) return console.log("Error fetching users", response);

      const onlineUsers = response?.data.filter((u) => {
        let isChatCreated = false;

        if (user?.data?._id === u._id) return false;
        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        // console.log("userChats", userChats);
        return !isChatCreated;
      });
      setOnlineUserChats(onlineUsers);
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.data?._id) {
        // console.log("User", user);
        setIsUserChatsLoading(true);
        setUserChatError(null);
        const response = await getRequest(`/chats/${user?.data?._id}`);
        setIsUserChatsLoading(false);
        if (response.error) {
          return setUserChatError(response);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
        setIsMessagesLoading(true);
        setMessagesError(null);
        const response = await getRequest(`/messages/${currentChat?._id}`);
        setIsMessagesLoading(false);
        if (response.error) {
          return setMessagesError(response);
        }
        setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  // console.log("currentChat", currentChat);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest("/chats", { firstId, secondId });
    if (response.error) {
      return console.log("Error creating chat", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatError,
        onlineUserChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

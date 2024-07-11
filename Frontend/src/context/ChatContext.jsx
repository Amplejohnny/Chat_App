import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";

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
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  //initializing socket
  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [user]);

  //Adding online users
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?.data?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  //send message realtime
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members?.find((id) => id !== user?.data?._id);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  //receiving message realtime and notifying user
  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });
    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some((id) => id === res.senderId);
      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });
    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  //Get users that are online but we are yet to open a chat with
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

        return !isChatCreated;
      });
      setOnlineUserChats(onlineUsers);
      setAllUsers(response?.data);
    };
    getUsers();
  }, [userChats]);

  //Listening for user's chats
  useEffect(() => {
    const getUserChats = async () => {
      if (user?.data?._id) {
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
  }, [user, notifications]);

  //Listening for received new messages
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

  //listening for sent messages
  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("Message cannot be empty...");
      const response = await postRequest("/messages", {
        text: textMessage,
        senderId: sender._id,
        chatId: currentChatId
      });
      if (response.error) {
        return setSendTextMessageError(response);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  //updating current chat
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  //Start a new chat
  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest("/chats", { firstId, secondId });
    if (response.error) {
      return console.log("Error creating chat", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  //mark all notification as read
  const markAllAsRead = useCallback((notifications) => {
    const updatedNotifications = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updatedNotifications);
  }, []);

  //mark and open a single notification as read
  const markAsRead = useCallback((n, userChats, user, notifications) => {
    //find chat to open
    const desiredChat = userChats.find((chat) => {
      const chatMembers = [user?.data._id, n.senderId];
      const isDesiredChat = chat?.members.every((member) => {
        return chatMembers.includes(member);
      });
      return isDesiredChat;
    });
    //mark notification as read
    const updatedNotifications = notifications.map((el) => {
      if (n.senderId === el.senderId) {
        return { ...n, isRead: true };
      } else {
        return el;
      }
    });
    //update current chat
    updateCurrentChat(desiredChat);
    setNotifications(updatedNotifications);
  }, []);

  const markParticularAsRead = useCallback((particularUserNotification, notifications) => {
    const updatedNotifications = notifications.map((el) => {
      let notification;

      particularUserNotification.forEach((n) => {
        if (n.senderId === el.senderId) {
          notification = { ...n, isRead: true };
        }
      });

      return notification ? notification : el;
    });
    setNotifications(updatedNotifications);
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
        currentChat,
        sendTextMessage,
        sendTextMessageError,
        onlineUsers,
        notifications,
        allUsers,
        markAllAsRead,
        markAsRead,
        markParticularAsRead, 
        newMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

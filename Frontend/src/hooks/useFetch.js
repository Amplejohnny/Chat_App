import { useEffect, useState } from "react";
import { getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== user?.data?._id);
  // console.log("recipientUser", recipientId);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;
      const response = await getRequest(`/auth/find/${recipientId}`);
      if (response.error) {
        return setError(error);
      }
      setRecipientUser(response);
    };
    getUser();
  }, [recipientId]);
  return { recipientUser };
};

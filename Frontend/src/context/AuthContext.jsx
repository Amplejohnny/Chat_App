import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  // console.log("User", user);
  // console.log("loginInfo", loginInfo);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return setUser(user);
  }, []);

  const updateRegisterinfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLogininfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      const response = await postRequest("/auth/signup", registerInfo);
      setIsRegisterLoading(false);
      if (response.error) {
        return setRegisterError(response);
      }
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
      const response = await postRequest("/auth/login", loginInfo);
      setIsLoginLoading(false);
      if (response.error) {
        return setLoginError(response);
      }
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );

  const logOutUser = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    updateLogininfo({ email: "", password: "" });
  }, []);

  const clearLoginError = useCallback(() => {
    setLoginError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterinfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logOutUser,
        loginUser,
        loginError,
        isLoginLoading,
        updateLogininfo,
        loginInfo,
        clearLoginError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useState } from "react";

type UserContext = {
  token: null | string;
  userId: null | string;
  isLoggedIn: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<UserContext>({
  token: null,
  userId: null,
  isLoggedIn: false,
  login: (token: string, userId: string): void => {},
  logout: (): void => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = (props: Props) => {
  const initialToken = localStorage.getItem("token");
  const initialUserId = localStorage.getItem("userId");

  const [token, setToken] = useState<null | string>(initialToken);
  const [userId, setUserId] = useState<null | string>(initialUserId);

  const isLoggedIn = !!token;

  const loginHandler = (token: string, userId: string): void => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  const logoutHandler = (): void => {
    setToken(null);
    setUserId(null);
    localStorage.clear();
  };

  const contextValue: UserContext = {
    token,
    userId,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

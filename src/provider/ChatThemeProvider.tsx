// provider/ChatThemeProvider.tsx
import React, { createContext, useContext } from "react";

type ChatTheme = {
  buttonBackgroundColor?: string;
  inputBackgroundMessage?: string;
  outputBackgroundMessage?: string;
  inputFieldBackground?: string;
  windowBackgroundColor?: string;
  textColor?: string;
  borderRadius?: string | number;
  headerBackgroundColor?: string;
  headerTextColor?: string;
  headerIconColor?: string;
};

const defaultTheme: ChatTheme = {
  buttonBackgroundColor: "#007bff",
  windowBackgroundColor: "#fff",
  inputFieldBackground: "#fff",
  outputBackgroundMessage: "#007bff",
  inputBackgroundMessage: "#fff",
  textColor: "#000",
  borderRadius: "12px",
  headerBackgroundColor: "#fff",
  headerTextColor: "#000",
  headerIconColor: "#888",
};

const ChatThemeContext = createContext<ChatTheme>(defaultTheme);

export const useChatTheme = () => useContext(ChatThemeContext);

type Props = {
  theme?: ChatTheme;
  children: React.ReactNode;
};

export const ChatThemeProvider = ({ theme = {}, children }: Props) => {
  const merged = { ...defaultTheme, ...theme };
  // Ensure children is properly handled
  if (!children) {
    return null;
  }
  return (
    <ChatThemeContext.Provider value={merged}>
      {children}
    </ChatThemeContext.Provider>
  );
};
export default ChatThemeProvider;

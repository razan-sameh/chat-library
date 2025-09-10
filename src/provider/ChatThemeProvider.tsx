// provider/ChatThemeProvider.tsx
import React, { createContext, useContext } from "react";

type ChatTheme = {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string | number;
};

const defaultTheme: ChatTheme = {
  primaryColor: "#007bff",
  secondaryColor: "#f1f1f1",
  backgroundColor: "#fff",
  textColor: "#000",
  borderRadius: "12px",
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

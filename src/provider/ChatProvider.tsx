import React, { createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatThemeProvider } from "./ChatThemeProvider.js";
import { ChatApi, typChatUser } from "../content/types.js";

const ChatApiContext = createContext<ChatApi | null>(null);
const ChatUserContext = createContext<typChatUser | null>(null);

export const useChatApi = () => {
  const ctx = useContext(ChatApiContext);
  if (!ctx) throw new Error("useChatApi must be used inside ChatProvider");
  return ctx;
};
export const useChatUser = () => {
  const ctx = useContext(ChatUserContext);
  if (!ctx) throw new Error("useChatUser must be used inside ChatProvider");
  return ctx;
};

type ChatProviderProps = {
  api: ChatApi;
  user: typChatUser;
  queryClient?: QueryClient;
  theme?: Parameters<typeof ChatThemeProvider>[0]["theme"];
  children?: React.ReactNode;
};

const ChatProvider = ({
  api,
  user,
  queryClient,
  theme,
  children,
}: ChatProviderProps) => {
  const client = queryClient ?? new QueryClient();  
  // Ensure children is properly handled
  if (!children) {
    return null;
  }

  return (
    <QueryClientProvider client={client}>
      <ChatThemeProvider theme={theme ?? {}}>
        <ChatApiContext.Provider value={api}>
          <ChatUserContext.Provider value={user}>
            {children}
          </ChatUserContext.Provider>
        </ChatApiContext.Provider>
      </ChatThemeProvider>
    </QueryClientProvider>
  );
};
export default ChatProvider;

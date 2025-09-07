// hooks/useChatWindow.ts
import { useState } from "react";
import { useChatUser, useChatApi } from "../provider/ChatProvider.js";
import useGetMessages from "./useGetMessages.js";
import useSendMessage from "./useSendMessage.js";

export const useChatWindow = (chatId: string) => {
  const user = useChatUser();
  const api = useChatApi();

  const { data: messages = [] } = useGetMessages(api, chatId);
  const sendMutation = useSendMessage(api);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendMutation.mutate({
      chatId,
      senderId: user.id,
      receiverId: "server",
      text: input,
    });
    setInput("");
  };

  return { messages, input, setInput, handleSend, userId: user.id };
};

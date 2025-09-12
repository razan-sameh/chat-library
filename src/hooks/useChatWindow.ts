import { useState } from "react";
import { useChatUser, useChatApi } from "../provider/ChatProvider";
import useChat from "./useChat";
import useGetMessages from "./useGetMessages";
import useParticipants from "./useParticipants";
import useSendMessage from "./useSendMessage";

export const useChatWindow = (chatId?: string, participants?: string[]) => {
  const user = useChatUser();
  const api = useChatApi();

  if (!chatId && (!participants || participants.length === 0)) {
    throw new Error(
      "You must provide either chatId or participants to initialize the chat"
    );
  }

  const { chat: activeChat, isLoading: chatLoading, isError: chatError } = useChat({
    chatId,
    participants,
  });

  // ✅ call hook unconditionally
  const sendMutation = useSendMessage(api, activeChat?.id || "placeholder");

  const messagesQuery = useGetMessages(api, activeChat?.id || "");

  const [input, setInput] = useState("");
  const handleSend = () => {
    if (!input.trim() || !activeChat) return;
    sendMutation.mutate({
      chatId: activeChat.id,
      senderId: user.id,
      text: input,
    });
    setInput("");
  };

  const otherUser = useParticipants(activeChat);

  return {
    chat: activeChat,
    otherUser,
    participants: activeChat?.participants ?? [],
    messages: messagesQuery.data ?? [],
    input,
    setInput,
    handleSend,
    userId: user.id,
    isSending: sendMutation.isPending,
    isLoading: chatLoading || messagesQuery.isLoading,
    isError: chatError,
  };
};

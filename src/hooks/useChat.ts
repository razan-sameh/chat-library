import { useQuery, useMutation } from "@tanstack/react-query";
import { useChatUser, useChatApi } from "../provider/ChatProvider.js";
import { typChat } from "../content/types.js";

interface UseChatProps {
  chatId?: string | undefined;
  participants?: string[] | undefined;
}


export const useChat = ({ chatId, participants }: UseChatProps) => {
  const api = useChatApi();
  const currentUser = useChatUser();

  // Mutation to create chat (always includes currentUser.id)
  const createChatMutation = useMutation({
    mutationFn: async (participantsList: string[]) => {
      const chat = await api.createChat([currentUser.id, ...participantsList]);
      return chat;
    },
  });

  // Query to fetch or create chat
  const chatQuery = useQuery<typChat | null>({
    queryKey: ["chat", chatId, participants],
    queryFn: async () => {
      if (chatId) return api.fetchChat(chatId);
      if (participants && participants.length > 0) {
        // Create chat with currentUser.id included
        return createChatMutation.mutateAsync(participants);
      }
      return null;
    },
    enabled: !!chatId || !!(participants && participants.length),
  });

  return {
    chat: chatQuery.data ?? null,
    isLoading: chatQuery.isLoading || createChatMutation.isPending,
    isError: chatQuery.isError || createChatMutation.isError,
  };
};

export default useChat;

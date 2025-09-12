// hooks/useOtherUser.ts
import { useQuery } from "@tanstack/react-query";
import { typChat, typChatUser } from "../content/types.js";
import { useChatUser, useChatApi } from "../provider/ChatProvider.js";

export const useParticipants = (activeChat: typChat | null) => {
  const user = useChatUser();
  const api = useChatApi();

  const query = useQuery({
    queryKey: ["otherUser", activeChat?.participants],
    queryFn: async (): Promise<typChatUser | null> => {
      if (!activeChat) return null;
      const otherId = activeChat.participants.find((id) => id !== user.id);
      if (!otherId) return null;
      return api.fetchUser(otherId);
    },
    enabled: !!activeChat,
    staleTime: 30_000, // refetch after 30 seconds if needed
  });

  return query.data ?? null;
};

export default useParticipants;

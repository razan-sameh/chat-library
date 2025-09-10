import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ChatApi, typMessage } from "../content/types.js";

const useGetMessages = (
  api: ChatApi,
  chatId: string
): UseQueryResult<typMessage[]> => {
  return useQuery({
    queryKey: ["messages", { chatId }],
    queryFn: ({ signal }) => api.fetchMessages(chatId, signal),
  });
};

export default useGetMessages;

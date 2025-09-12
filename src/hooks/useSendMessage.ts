// hooks/useSendMessage.ts
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { ChatApi, typMessage, SendMessageInput } from "../content/types.js";

const useSendMessage = (
  api: ChatApi,
  chatId: string
): UseMutationResult<typMessage, Error, SendMessageInput> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.sendMessage,
    onMutate: (data) => {
      // Get previous messages for rollback
      const saved = queryClient.getQueryData<typMessage[]>([
        "messages",
        { chatId },
      ]);

      // optimistic update
      const optimistic: typMessage = {
        ...data,
        id: String(Date.now()),
        timestamp: Date.now(),
      };

      queryClient.setQueryData<typMessage[]>(
        ["messages", { chatId }],
        (msgs = []) => [...msgs, optimistic] // append at the end
      );

      return () =>
        queryClient.setQueryData(["messages", { chatId }], saved);
    },
    onError: (_, __, rollback) => rollback?.(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", { chatId }] });
    },
  });
};

export default useSendMessage;

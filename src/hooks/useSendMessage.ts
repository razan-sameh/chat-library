import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { ChatApi, typMessage, SendMessageInput } from "../content/types.js";

const useSendMessage = (
  api: ChatApi
): UseMutationResult<typMessage, Error, SendMessageInput> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.sendMessage,
    onMutate: (data) => {
      const saved = queryClient.getQueryData([
        "messages",
        { chatId: data.senderId },
      ]);

      // optimistic update
      const optimistic: typMessage = {
        ...data,
        id: String(Date.now()),
        timestamp: Date.now(),
      };

      queryClient.setQueryData<typMessage[]>(
        ["messages", { chatId: data.senderId }],
        (msgs = []) => [optimistic, ...msgs]
      );

      return () =>
        queryClient.setQueryData(
          ["messages", { chatId: data.senderId }],
          saved
        );
    },
    onError: (_, __, rollback) => rollback?.(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export default useSendMessage;

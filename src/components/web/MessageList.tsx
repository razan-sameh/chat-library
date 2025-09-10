import { typMessage } from "../../content/types";
import { MessageBubble } from "./MessageBubble";

type Props = { messages: typMessage[]; userId: string };

export const MessageList = ({ messages, userId }: Props) => (
  <div style={{ flex: 1, overflowY: "auto", padding: "4px" }}>
    {messages.map((m) => (
      <MessageBubble key={m.id} message={m} isOwn={m.senderId === userId} />
    ))}
  </div>
);

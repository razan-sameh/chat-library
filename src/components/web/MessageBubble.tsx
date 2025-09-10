import { typMessage } from "../../content/types";
import { useChatTheme } from "../../provider/ChatThemeProvider";

type Props = { message: typMessage; isOwn: boolean };

export const MessageBubble = ({ message, isOwn }: Props) => {
  const theme = useChatTheme();
  return (
    <div style={{ textAlign: isOwn ? "right" : "left", marginBottom: "6px" }}>
      <span
        style={{
          display: "inline-block",
          padding: "6px 10px",
          borderRadius: theme.borderRadius || "8px",
          background: isOwn
            ? theme.outputBackgroundMessage
            : theme.inputBackgroundMessage,
          color: isOwn ? "#fff" : theme.textColor,
          maxWidth: "70%",
          wordWrap: "break-word",
        }}
      >
        {message.text}
      </span>
    </div>
  );
};

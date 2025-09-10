import { enmMode } from "../../content/enums";
import { useChatWindow } from "../../hooks/useChatWindow";
import { useChatUser } from "../../provider/ChatProvider";
import { useChatTheme } from "../../provider/ChatThemeProvider";
import { ChatHeader } from "./ChatHeader";
import { InputBox } from "./InputBox";
import { MessageList } from "./MessageList";
import { useParams } from "react-router-dom";

type Props = {
  chatId?: string;
  defaultMode?: enmMode;
};
const ChatWindow = ({
  chatId: propChatId,
  defaultMode = enmMode.popup,
}: Props) => {
  const { chatId: paramChatId } = useParams<{ chatId: string }>();
  const chatId = propChatId || paramChatId;
  const { messages, input, setInput, handleSend, userId } = useChatWindow(
    chatId!
  );
  const user = useChatUser();
  const theme = useChatTheme();
  const style: React.CSSProperties =
    defaultMode === enmMode.popup
      ? {
          width: "300px",
          height: "400px",
          flexDirection: "column",
          background: theme.windowBackgroundColor,
          borderRadius: theme.borderRadius || "8px",
          position: "fixed",
          bottom: "80px",
          right: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          zIndex: 1,
          display: "flex",
        }
      : {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: theme.windowBackgroundColor,
          padding: 0,
          height: "100vh",
          width: "100vw",
        };

  return (
    <div style={style as React.CSSProperties}>
      <ChatHeader user={user} />
      <MessageList messages={messages} userId={userId} />
      <InputBox input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
};
export default ChatWindow;

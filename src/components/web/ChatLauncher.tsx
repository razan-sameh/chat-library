// components/ChatLauncher.tsx
import { useState } from "react";
import  ChatWindow  from "./ChatWindow";
import { useChatTheme } from "../../provider/ChatThemeProvider";
import { enmMode } from "../../content/enums";

type Props = {
  chatId: string;
  defaultMode?: enmMode; // Make it optional to match the main component
};

const ChatLauncher = ({ chatId ,defaultMode = enmMode.popup}: Props) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const theme = useChatTheme();
console.log('this is web');

  return (
    <>
      <div
        style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1 }}
      >
        <button
          onClick={toggle}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: theme.primaryColor,
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          💬
        </button>
      </div>

      {open && <ChatWindow chatId={chatId} defaultMode={defaultMode}/>}
    </>
  );
};
export default ChatLauncher
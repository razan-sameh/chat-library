// components/ChatLauncher.tsx
import React, { useState } from "react";
import { ChatWindow } from "./ChatWindow.js";
import { useChatTheme } from "../provider/ChatThemeProvider.js";

type Props = {
  chatId: string;
};

export const ChatLauncher = ({ chatId }: Props) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const theme = useChatTheme();

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

      {open && <ChatWindow chatId={chatId} />}
    </>
  );
};

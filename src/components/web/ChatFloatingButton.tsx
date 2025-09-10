// components/web/ChatLauncher.tsx
import { useState, ReactNode, CSSProperties } from "react";
import ChatWindow from "./ChatWindow";
import { useChatTheme } from "../../provider/ChatThemeProvider";
import { enmMode } from "../../content/enums";

type Props = {
  chatId: string;
  defaultMode?: enmMode;
  buttonContainer?: ReactNode; // custom content inside default button
  buttonStyle?: CSSProperties; // style for default button
  buttonComponent?: (toggle: () => void) => ReactNode; // full custom button
};

const DefaultButton = () => (
  <span style={{ fontSize: "20px", color: "white" }}>💬</span>
);

const ChatFloatingButton = ({
  chatId,
  defaultMode = enmMode.popup,
  buttonContainer,
  buttonStyle,
  buttonComponent,
}: Props) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const theme = useChatTheme();

  return (
    <>
      {buttonComponent ? (
        // consumer provides full custom button
        buttonComponent(toggle)
      ) : (
        // fallback to default floating button
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1,
          }}
        >
          <button
            onClick={toggle}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: theme.buttonBackgroundColor,
              border: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              ...buttonStyle,
            }}
          >
            {buttonContainer ?? <DefaultButton />}
          </button>
        </div>
      )}

      {open && <ChatWindow chatId={chatId} defaultMode={defaultMode} />}
    </>
  );
};

export default ChatFloatingButton;

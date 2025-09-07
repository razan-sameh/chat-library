// components/ChatWindow.tsx
import { useChatWindow } from "../hooks/useChatWindow.js";
import { useChatTheme } from "../provider/ChatThemeProvider.js";

type Props = { chatId: string };

export const ChatWindow = ({ chatId }: Props) => {
  const { messages, input, setInput, handleSend, userId } = useChatWindow(chatId);
  const theme = useChatTheme();

  return (
    <div
      style={{
        border: `1px solid ${theme.secondaryColor}`,
        padding: "10px",
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        background: theme.backgroundColor,
        borderRadius: theme.borderRadius || "8px",
        position: "fixed",
        bottom: "80px",
        right: "20px",
        zIndex:1,
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "10px",
          padding: "4px",
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              textAlign: m.senderId === userId ? "right" : "left",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: theme.borderRadius || "8px",
                background:
                  m.senderId === userId ? theme.primaryColor : theme.secondaryColor,
                color: m.senderId === userId ? "#fff" : theme.textColor,
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: "6px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "6px",
            borderRadius: theme.borderRadius || "6px",
            border: `1px solid ${theme.secondaryColor}`,
            outline: "none",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: "6px 12px",
            background: theme.primaryColor,
            color: "#fff",
            border: "none",
            borderRadius: theme.borderRadius || "6px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

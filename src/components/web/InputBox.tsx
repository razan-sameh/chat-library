import { useChatTheme } from "../../provider/ChatThemeProvider";

type Props = {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
};

export const InputBox = ({ input, setInput, onSend }: Props) => {
  const theme = useChatTheme();

  return (
    <div style={{ display: "flex", gap: "6px", padding: "6px" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{
          flex: 1,
          padding: "6px",
          borderRadius: theme.borderRadius || "6px",
          backgroundColor: theme.inputFieldBackground,
          outline: "none",
          border: 0
        }}
      />
      <button
        onClick={onSend}
        style={{
          padding: "6px 12px",
          background: theme.buttonBackgroundColor,
          color: "#fff",
          border: "none",
          borderRadius: theme.borderRadius || "6px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
};

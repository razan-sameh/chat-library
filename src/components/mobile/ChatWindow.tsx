import { View, StyleSheet, Text } from "react-native";
import { useChatWindow } from "../../hooks/useChatWindow";
import { useChatTheme } from "../../provider/ChatThemeProvider";
import { enmMode } from "../../content/enums";
import { InputBox } from "./InputBox";
import { MessageList } from "./MessageList";
import { ChatHeader } from "./ChatHeader";
import { useChatUser } from "../../provider/ChatProvider";
import { ActivityIndicator } from "react-native";

type Props = {
  route?: any;
  chatIdProp?: string;
  defaultMode?: enmMode;
  participants?: string[];
};

const ChatWindow = ({
  route,
  defaultMode = enmMode.fullscreen,
  participants,
  chatIdProp,
}: Props) => {
  const chatId = route.params?.chatId || chatIdProp;
  const {
    messages,
    input,
    setInput,
    handleSend,
    userId,
    chat,
    isLoading,
    isError,
  } = useChatWindow(chatId, participants);
  const user = useChatUser();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.text}>⏳ Preparing chat...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={[styles.text, { color: "red" }]}>
          ❌ Failed to load chat
        </Text>
      </View>
    );
  }

  if (!chat) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No chat available</Text>
      </View>
    );
  }
  const theme = useChatTheme();
  // Add error boundary for the hook
  if (!messages || !userId) {
    return (
      <View
        style={[
          defaultMode === enmMode.popup ? styles.popup : styles.screen,
          { backgroundColor: theme.windowBackgroundColor },
        ]}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* You might want to add a loading spinner here */}
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        defaultMode === enmMode.popup ? styles.popup : styles.screen,
        { backgroundColor: theme.windowBackgroundColor },
      ]}
    >
      <ChatHeader user={user} />
      <MessageList messages={messages} userId={userId} />
      <InputBox input={input} setInput={setInput} onSend={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 300,
    height: 400,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  screen: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});
export default ChatWindow;

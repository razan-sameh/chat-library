import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useChatTheme } from "../../provider/ChatThemeProvider";
import { enmMode } from "../../content/enums";
import ChatWindow from "./ChatWindow";

type Props = {
  chatId: string;
  defaultMode?: enmMode;
};

const ChatLauncher = ({
  chatId,
  defaultMode = enmMode.popup,
}: Props) => {
  console.log('this is mobile');
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const theme = useChatTheme();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={toggle}
        style={[styles.button, { backgroundColor: theme.primaryColor }]}
      >
        <Text style={styles.buttonText}>💬</Text>
      </Pressable>

      {open && <ChatWindow chatId={chatId} defaultMode={defaultMode} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
export default ChatLauncher;

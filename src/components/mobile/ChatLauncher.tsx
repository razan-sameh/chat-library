import React, { useState, ReactNode } from "react";
import { View, Pressable, StyleSheet, ViewStyle, Text } from "react-native";
import { useChatTheme } from "../../provider/ChatThemeProvider";
import { enmMode } from "../../content/enums";
import ChatWindow from "./ChatWindow";

type Props = {
  chatId: string;
  defaultMode?: enmMode;
  buttonContainer?: ReactNode; // custom content inside default Pressable
  buttonStyle?: ViewStyle; // style for default Pressable
  buttonComponent?: (toggle: () => void) => ReactNode; // full custom button
};

const DefaultButton = () => (
  <Text style={styles.buttonText}>💬</Text>
);

const ChatLauncher = ({
  chatId,
  defaultMode = enmMode.fullscreen,
  buttonContainer: button,
  buttonStyle,
  buttonComponent,
}: Props) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const theme = useChatTheme();

  return (
    <View style={styles.container}>
      {buttonComponent ? (
        // consumer provides their own full button
        buttonComponent(toggle)
      ) : (
        // fallback to default floating button
        <Pressable
          onPress={toggle}
          style={[
            styles.button,
            { backgroundColor: theme.primaryColor },
            buttonStyle,
          ]}
        >
          {button ?? <DefaultButton />}
        </Pressable>
      )}

      {open && <ChatWindow chatIdProp={chatId} defaultMode={defaultMode} />}
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

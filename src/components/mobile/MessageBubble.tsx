import { View, Text, StyleSheet } from "react-native";
import { useChatTheme } from "../../provider/ChatThemeProvider";
import { typMessage } from "../../content/types";

type Props = { message: typMessage; isOwn: boolean };

export const MessageBubble = ({ message, isOwn }: Props) => {
  const theme = useChatTheme();
  return (
    <View
      style={[
        styles.container,
        { alignSelf: isOwn ? "flex-end" : "flex-start" },
      ]}
    >
      <Text
        style={[
          styles.bubble,
          {
            backgroundColor: isOwn
              ? theme.outputBackgroundMessage
              : theme.inputBackgroundMessage,
            color: isOwn ? "#fff" : theme.textColor,
          },
        ]}
      >
        {message.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 6 },
  bubble: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    maxWidth: "70%",
  },
});

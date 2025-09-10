import { ScrollView, StyleSheet } from "react-native";
import { Message } from "../../content/types";
import { MessageBubble } from "./MessageBubble";

type Props = {
  messages: Message[];
  userId: string;
};

export const MessageList = ({ messages, userId }: Props) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 4 }}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} isOwn={m.senderId === userId} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

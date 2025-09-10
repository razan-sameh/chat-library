import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { useChatTheme } from "../../provider/ChatThemeProvider";

type Props = {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
};

export const InputBox = ({ input, setInput, onSend }: Props) => {
  const theme = useChatTheme();
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputFieldBackground }]}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
      />
      <Pressable
        onPress={onSend}
        style={[
          styles.button,
          { backgroundColor: theme.buttonBackgroundColor },
        ]}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 6 },
  input: { flex: 1, borderRadius: 6, padding: 6, borderWidth: 0 },
  button: {
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 6,
    marginLeft: 6,
  },
  buttonText: { color: "#fff" },
});

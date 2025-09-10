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
    <View style={[styles.container, { borderTopColor: theme.secondaryColor }]}>
      <TextInput
        style={[styles.input, { borderColor: theme.secondaryColor }]}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
      />
      <Pressable
        onPress={onSend}
        style={[styles.button, { backgroundColor: theme.primaryColor }]}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 6, borderTopWidth: 1 },
  input: { flex: 1, borderWidth: 1, borderRadius: 6, padding: 6 },
  button: {
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 6,
    marginLeft: 6,
  },
  buttonText: { color: "#fff" },
});

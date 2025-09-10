import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import IoniconsImport from "react-native-vector-icons/Ionicons";
import { callPhoneFromMobile } from "../../content/utils";
import { typChatUser } from "../../content/types";
import { useChatTheme } from "../../provider/ChatThemeProvider";

const Ionicons = (IoniconsImport as any).default || IoniconsImport;

type Props = {
  user: typChatUser;
};

export const ChatHeader = ({ user }: Props) => {
  const theme = useChatTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.headerBackgroundColor },
      ]}
    >
      {/* Avatar or Fallback Icon */}
      {user.avatar ? (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      ) : (
        <Ionicons
          name="person-circle-outline"
          size={40}
          color={theme.headerIconColor}
          style={styles.avatarIcon}
        />
      )}

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={[styles.name, { color: theme.headerTextColor }]}>
          {user.name}
        </Text>
        {user.phone && (
          <Text style={[styles.phone, { color: theme.headerTextColor }]}>
            {user.phone.countryCode} {user.phone.number}
          </Text>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {user.phone && (
          <TouchableOpacity
            onPress={() =>
              callPhoneFromMobile(user.phone.countryCode, user.phone.number)
            }
            style={styles.iconButton}
          >
            <Ionicons name="call" size={22} color={theme.headerIconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarIcon: {
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  phone: {
    fontSize: 12,
    color: "gray",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 6,
  },
});

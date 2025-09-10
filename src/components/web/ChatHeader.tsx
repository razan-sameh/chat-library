import React from "react";
import { FaPhone, FaUserCircle } from "react-icons/fa";
import { typChatUser } from "../../content/types";
import { useChatTheme } from "../../provider/ChatThemeProvider";

type Props = {
  user: typChatUser;
};

export const ChatHeader = ({ user }: Props) => {
  const theme = useChatTheme();

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: theme.headerBackgroundColor,
      }}
    >
      {/* Avatar */}
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} style={styles.avatar} />
      ) : (
        <FaUserCircle size={40} color={theme.headerIconColor as string} />
      )}

      {/* User Info */}
      <div style={styles.userInfo}>
        <div style={{ ...styles.name, color: theme.headerTextColor }}>
          {user.name}
        </div>
        {user.phone && (
          <div style={{ ...styles.phone, color: theme.headerTextColor }}>
            {user.phone.countryCode} {user.phone.number}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={styles.actions}>
        {user.phone && (
          <button
            style={styles.iconButton}
            onClick={() =>
              window.open(`tel:${user.phone.countryCode}${user.phone.number}`)
            }
          >
            <FaPhone size={18} color={theme.headerIconColor as string} />
          </button>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    marginRight: 12,
    objectFit: "cover",
  },
  userInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    paddingLeft: "10px",
  },
  phone: {
    fontSize: 12,
  },
  actions: {
    display: "flex",
    gap: 12,
  },
  iconButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 6,
  },
};

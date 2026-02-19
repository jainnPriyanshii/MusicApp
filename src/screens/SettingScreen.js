import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingItem = ({ icon, title, value, type = "link" }) => (
  <TouchableOpacity style={styles.item}>
    <View style={styles.itemLeft}>
      <Ionicons name={icon} size={22} color="#fff" style={{ width: 30 }} />
      <Text style={styles.itemText}>{title}</Text>
    </View>
    {type === "switch" ? (
      <Switch
        value={value}
        trackColor={{ false: "#767577", true: "#dc773ce2" }}
      />
    ) : (
      <Ionicons name="chevron-forward" size={20} color="#666" />
    )}
  </TouchableOpacity>
);

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <Text style={styles.sectionTitle}>Audio Quality</Text>
      <SettingItem icon="cellular" title="Streaming Quality" />
      <SettingItem icon="download" title="Download Quality" />

      <Text style={styles.sectionTitle}>Storage</Text>
      <SettingItem icon="trash-outline" title="Clear Cache" />
      <SettingItem
        icon="cloud-offline-outline"
        title="Offline Mode"
        type="switch"
        value={false}
      />

      <Text style={styles.sectionTitle}>Account</Text>
      <SettingItem icon="person-outline" title="Profile" />
      <SettingItem icon="log-out-outline" title="Log Out" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 40,
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#dc773ce2",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 20,
    textTransform: "uppercase",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  itemText: { color: "#fff", fontSize: 16, marginLeft: 10 },
});

export default SettingScreen;

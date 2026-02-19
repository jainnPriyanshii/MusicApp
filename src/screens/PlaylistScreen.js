import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PLAYLISTS = [
  {
    id: "1",
    title: "Gym Hits",
    count: "24 Songs",
    image: "https://picsum.photos/200",
  },
  {
    id: "2",
    title: "Relaxing Lo-Fi",
    count: "50 Songs",
    image: "https://picsum.photos/201",
  },
  {
    id: "3",
    title: "Bollywood 90s",
    count: "102 Songs",
    image: "https://picsum.photos/202",
  },
];

const PlaylistScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.count}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Playlists</Text>
      <FlatList
        data={PLAYLISTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    marginTop: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 10,
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  info: { flex: 1, marginLeft: 15 },
  title: { color: "#fff", fontSize: 16, fontWeight: "600" },
  subtitle: { color: "#b3b3b3", fontSize: 13, marginTop: 4 },
});

export default PlaylistScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.seeAll}>See All</Text>
    </TouchableOpacity>
  </View>
);

const SuggestedRoute = () => (
  <ScrollView style={styles.tabContainer}>
    {/* Recently Played Section */}
    <SectionHeader title="Recently Played" />
    <FlatList
      horizontal
      data={[1, 2, 3]}
      renderItem={() => (
        <View style={styles.albumCard}>
          <Image
            source={{ uri: "https://picsum.photos/150" }}
            style={styles.albumArt}
          />
          <Text style={styles.albumText} numberOfLines={2}>
            Shades of Love - Ania Szarm..
          </Text>
        </View>
      )}
      keyExtractor={(item) => item.toString()}
      showsHorizontalScrollIndicator={false}
    />

    <SectionHeader title="Artists" />
    <FlatList
      horizontal
      data={[1, 2, 3]}
      renderItem={() => (
        <View style={styles.artistCard}>
          <Image
            source={{ uri: "https://picsum.photos/151" }}
            style={styles.artistArt}
          />
          <Text style={styles.artistText}>Ariana Grande</Text>
        </View>
      )}
      keyExtractor={(item) => item.toString()}
      showsHorizontalScrollIndicator={false}
    />

    <SectionHeader title="Most Played" />
    <FlatList
      horizontal
      data={[1, 2, 3]}
      renderItem={() => (
        <View style={styles.albumCard}>
          <Image
            source={{ uri: "https://picsum.photos/152" }}
            style={styles.albumArt}
          />
        </View>
      )}
      keyExtractor={(item) => item.toString()}
      showsHorizontalScrollIndicator={false}
    />
    <View style={{ height: 100 }} />
  </ScrollView>
);

// Placeholder for other tabs
const OtherRoute = () => (
  <View style={styles.tabContainer}>
    <Text style={{ color: "#fff" }}>Coming Soon...</Text>
  </View>
);

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "suggested", title: "Suggested" },
    { key: "songs", title: "Songs" },
    { key: "artists", title: "Artists" },
    { key: "albums", title: "Albums" },
  ]);

  const renderScene = SceneMap({
    suggested: SuggestedRoute,
    songs: OtherRoute,
    artists: OtherRoute,
    albums: OtherRoute,
  });

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="musical-notes" size={28} color="#FF7000" />
          <Text style={styles.brandName}>My Player</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#FF7000", height: 3 }}
            style={{ backgroundColor: "transparent", elevation: 0 }}
            labelStyle={{ fontWeight: "bold", textTransform: "none" }}
            activeColor="#FF7000"
            inactiveColor="#666"
            scrollEnabled={true}
            tabStyle={{ width: "auto", paddingHorizontal: 20 }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", paddingTop: 50 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  brandName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  tabContainer: { flex: 1, paddingHorizontal: 15 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  seeAll: { color: "#FF7000", fontSize: 14, fontWeight: "600" },
  albumCard: { width: 140, marginRight: 15 },
  albumArt: { width: 140, height: 140, borderRadius: 15 },
  albumText: { color: "#fff", marginTop: 8, fontSize: 14, fontWeight: "500" },
  artistCard: { width: 110, marginRight: 15, alignItems: "center" },
  artistArt: { width: 100, height: 100, borderRadius: 50 },
  artistText: { color: "#fff", marginTop: 8, fontSize: 14, fontWeight: "500" },
});

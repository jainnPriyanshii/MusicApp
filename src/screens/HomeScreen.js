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
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.seeAll}>See All</Text>
    </TouchableOpacity>
  </View>
);

const SuggestedRoute = ({ navigation }) => (
  <ScrollView style={styles.tabContainer}>
    {/* Recently Played Section */}
    <SectionHeader title="Recently Played" />
    <FlatList
      horizontal
      data={[1, 2, 3]}
      renderItem={({ item }) => (
        <SongCard
          song={{
            title: "Shades of Love",
            artist: "Ania Szarmach",
            image: "https://picsum.photos/150",
          }}
          onPress={() => navigation.navigate("Player")}
        />
      )}
      keyExtractor={(item) => item.toString()}
      showsHorizontalScrollIndicator={false}
    />

    <SectionHeader title="Artists" />
    <FlatList
      horizontal
      data={[1, 2, 3]}
      renderItem={({ item }) => (
        <ArtistCard
          artist={{
            name: "Ariana Grande",
            image: "https://picsum.photos/151",
          }}
          onPress={() => navigation.navigate("ArtistDetails", {
            artist: {
              name: "Ariana Grande",
              image: "https://picsum.photos/151",
            }
          })}
        />
      )}
      keyExtractor={(item) => item.toString()}
      showsHorizontalScrollIndicator={false}
    />

    <SectionHeader title="Most Played" />
    <FlatList
      horizontal
      data={[1, 2, 3]}
      renderItem={({ item }) => (
        <SongCard
          song={{
            title: "Song " + item,
            artist: "Artist " + item,
            image: "https://picsum.photos/152",
          }}
          onPress={() => navigation.navigate("Player")}
        />
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

export default function HomeScreen({ navigation }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "suggested", title: "Suggested" },
    { key: "songs", title: "Songs" },
    { key: "artists", title: "Artists" },
    { key: "albums", title: "Albums" },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "suggested":
        return <SuggestedRoute navigation={navigation} />;
      case "songs":
        return <OtherRoute />;
      case "artists":
        return <OtherRoute />;
      case "albums":
        return <OtherRoute />;
      default:
        return null;
    }
  };

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
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  seeAll: { color: "#FF7000", fontSize: 14, fontWeight: "600" },
});

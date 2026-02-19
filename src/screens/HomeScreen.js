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

import { getTrendingSongs, getTrendingArtists } from "../services/api";
import { usePlayerStore } from "../store/usePlayerStore";

const SuggestedRoute = ({ navigation }) => {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsData, artistsData] = await Promise.all([
          getTrendingSongs("hindi"),
          getTrendingArtists()
        ]);
        // Handle potentially different data structures (array vs object with results)
        const songs = songsData?.results || songsData || [];
        const artists = artistsData?.results || artistsData || [];

        setTrendingSongs(Array.isArray(songs) ? songs : []);
        setArtists(Array.isArray(artists) ? artists : []);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getImage = (images) => {
    if (!images) return "https://picsum.photos/150";
    if (typeof images === 'string') return images;
    if (Array.isArray(images)) {
      // Return the highest quality or the last one
      return images[images.length - 1]?.link || images[0]?.link;
    }
    return "https://picsum.photos/150";
  };

  const decodeHtmlEntities = (text) => {
    if (!text) return "";
    return text.replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#039;/g, "'");
  };

 

  const getAudioUrl = (downloadUrl) => {
    if (!downloadUrl) return null;
    if (typeof downloadUrl === 'string') return downloadUrl;
    if (Array.isArray(downloadUrl)) {
      // Prefer 320kbps or the last available option
      const target = downloadUrl.find(item => item.quality === "320kbps");
      return target ? target.url : downloadUrl[downloadUrl.length - 1]?.url;
    }
    return null;
  };
  <ScrollView style={styles.tabContainer}>
    {/* Recently Played Section (Trending for now) */}
    <SectionHeader title="Trending Songs" />
    <FlatList
      horizontal
      data={trendingSongs}
      renderItem={({ item }) => (
        <SongCard
          song={{
            title: decodeHtmlEntities(item.name),
            artist: decodeHtmlEntities(item.primaryArtists || item.artist),
            image: getImage(item.image),
          }}
          onPress={() => navigation.navigate("Player", {
            song: {
              title: decodeHtmlEntities(item.name),
              artist: decodeHtmlEntities(item.primaryArtists || item.artist),
              image: getImage(item.image),
            }
          })}
        />
      )}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
    />

    <SectionHeader title="Top Artists" />
    <FlatList
      horizontal
      data={artists}
      renderItem={({ item }) => (
        <ArtistCard
          artist={{
            name: decodeHtmlEntities(item.name),
            image: getImage(item.image),
          }}
          onPress={() => navigation.navigate("ArtistDetails", {
            artist: {
              name: decodeHtmlEntities(item.name),
              image: getImage(item.image),
            }
          })}
        />
      )}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
    />

    <View style={{ height: 100 }} />
  </ScrollView>
  
};

const SongsRoute = ({ navigation }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getTrendingSongs("english"); // Fetching English songs for variety or keep same
        const results = data?.results || data || [];
        setSongs(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error("Error fetching songs tab:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const decodeHtmlEntities = (text) => {
    if (!text) return "";
    return text.replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#039;/g, "'");
  };

  const getImage = (images) => {
    if (!images) return "https://picsum.photos/150";
    if (typeof images === 'string') return images;
    if (Array.isArray(images)) {
      return images[images.length - 1]?.link || images[0]?.link;
    }
    return "https://picsum.photos/150";
  };

  return (
    <ScrollView style={styles.tabContainer}>
      {songs.map((item, index) => (
        <View key={item.id || index} style={{ marginBottom: 10 }}>
          <SongCard
            song={{
              title: decodeHtmlEntities(item.name || item.title),
              artist: decodeHtmlEntities(item.primaryArtists || item.artist || item.description),
              image: getImage(item.image),
            }}
            onPress={() => navigation.navigate("Player", {
              song: {
                title: decodeHtmlEntities(item.name || item.title),
                artist: decodeHtmlEntities(item.primaryArtists || item.artist || item.description),
                image: getImage(item.image),
              }
            })}
          />
        </View>
      ))}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const ArtistsRoute = ({ navigation }) => {
  const [artists, setArtists] = useState([]);

  React.useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getTrendingArtists();
        const results = data?.results || data || [];
        setArtists(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error("Error fetching artists tab:", error);
      }
    };
    fetchArtists();
  }, []);

  const decodeHtmlEntities = (text) => {
    if (!text) return "";
    return text.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#039;/g, "'");
  };

  const getImage = (images) => {
    if (!images) return "https://picsum.photos/150";
    if (typeof images === 'string') return images;
    if (Array.isArray(images)) {
      return images[images.length - 1]?.link || images[0]?.link;
    }
    return "https://picsum.photos/150";
  };

  return (
    <ScrollView style={styles.tabContainer}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {artists.map((item, index) => (
          <View key={item.id || index} style={{ width: '48%', marginBottom: 15 }}>
            <ArtistCard
              artist={{
                name: decodeHtmlEntities(item.name),
                image: getImage(item.image),
              }}
              onPress={() => navigation.navigate("ArtistDetails", {
                artist: {
                  name: decodeHtmlEntities(item.name),
                  image: getImage(item.image),
                }
              })}
            />
          </View>
        ))}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

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
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "suggested":
        return <SuggestedRoute navigation={navigation} />;
      case "songs":
        return <SongsRoute navigation={navigation} />;
      case "artists":
        return <ArtistsRoute navigation={navigation} />;
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
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
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
});

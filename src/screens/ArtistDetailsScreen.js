
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SongCard from "../components/SongCard";

const ArtistDetailsScreen = ({ route, navigation }) => {
  
    const { artist } = route.params || {
        artist: {
            name: "Unknown Artist",
            image: "https://picsum.photos/200",
            topSongs: [1, 2, 3]
        }
    };

    const handleSongPress = (song) => {
        navigation.navigate("Player", { song });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: artist.image }} style={styles.artistImage} />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* Artist Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.artistName}>{artist.name}</Text>
                    <Text style={styles.followers}>2.5M Followers</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.playButton}>
                            <Text style={styles.playButtonText}>Play All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.followButton}>
                            <Text style={styles.followButtonText}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Popular Songs */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Popular Songs</Text>
                    {/* Mock List */}
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <SongCard
                            key={index}
                            song={{
                                title: `Song ${item}`,
                                artist: artist.name,
                                image: `https://picsum.photos/200?random=${index}`,
                            }}
                            onPress={() => handleSongPress({ title: `Song ${item}`, artist: artist.name })}
                        />
                    ))}
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    scrollContent: {
        paddingBottom: 20,
    },
    imageContainer: {
        width: "100%",
        height: 300,
    },
    artistImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 20,
    },
    infoContainer: {
        padding: 20,
        alignItems: 'center',
        marginTop: -20,
        backgroundColor: '#121212',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    artistName: {
        color: "#FFF",
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    followers: {
        color: "#B3B3B3",
        fontSize: 14,
        marginTop: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        justifyContent: 'space-around',
    },
    playButton: {
        backgroundColor: "#FF7000",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    playButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    followButton: {
        borderWidth: 1,
        borderColor: "#FFF",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    followButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    sectionContainer: {
        paddingHorizontal: 0,
        marginTop: 10,
    },
    sectionTitle: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginBottom: 15,
    },
});

export default ArtistDetailsScreen;

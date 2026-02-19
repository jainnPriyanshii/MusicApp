
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PlayerScreen = ({ navigation, route }) => {
  const { song } = route.params || {
    song: {
      title: "Starboy",
      artist: "The Weeknd, Daft Punk",
      image: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Album Art */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: song.image }} style={styles.albumArt} />
      </View>

      {/* Song Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.artistName}>{song.artist}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: '70%' }]} />
          <View style={styles.progressKnob} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>03:35</Text>
          <Text style={styles.timeText}>03:50</Text>
        </View>
      </View>

      {/* Main Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons name="rewind-10" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#121212" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons name="fast-forward-10" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="speedometer-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="stopwatch-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="cast" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Lyrics Drawer Hint */}
      <View style={styles.lyricsHint}>
        <Ionicons name="chevron-up" size={20} color="#B3B3B3" />
        <Text style={styles.lyricsText}>Lyrics</Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  albumArt: {
    width: width - 60,
    height: width - 60,
    borderRadius: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  songTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artistName: {
    color: '#B3B3B3',
    fontSize: 16,
    fontWeight: '400',
  },
  progressContainer: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: '#FF7000',
    borderRadius: 2,
  },
  progressKnob: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF7000',
    marginLeft: -6, // Center on the end of the fill
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF7000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
  },
  actionButton: {
    padding: 10,
  },
  lyricsHint: {
    alignItems: 'center',
    marginTop: 10,
  },
  lyricsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: -2,
  },
});

export default PlayerScreen;
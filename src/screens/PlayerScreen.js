import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

import { usePlayerStore } from '../store/usePlayerStore';
import { useLibraryStore } from '../store/useLibraryStore';

const PlayerScreen = ({ navigation }) => {
  const { currentTrack, isPlaying, pause, resume, duration, position, seek } = usePlayerStore();
  const { toggleFavorite, favorites } = useLibraryStore();
  const [isSliding, setIsSliding] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  
  useEffect(() => {
    if (!isSliding) {
      setSliderValue(position);
    }
  }, [position, isSliding]);

  const song = currentTrack || {
    title: "Not Playing",
    artist: "Select a song",
    image: "https://via.placeholder.com/300",
    id: "dummy"
  };

  const isFav = favorites.find(t => t.id === song.id);

  const formatTime = (millis) => {
    if (!millis) return "00:00";
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSlidingComplete = async (value) => {
    await seek(value);
    setIsSliding(false);
  };

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

      {/* Progress Bar / Slider */}
      <View style={styles.progressContainer}>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={duration}
          value={sliderValue}
          onValueChange={(value) => {
            setIsSliding(true);
            setSliderValue(value);
          }}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor="#FF7000"
          maximumTrackTintColor="#333"
          thumbTintColor="#FF7000"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(sliderValue)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
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
          onPress={() => isPlaying ? pause() : resume()}
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
        <TouchableOpacity style={styles.actionButton} onPress={() => toggleFavorite(song)}>
          <Ionicons name={isFav ? "heart" : "heart-outline"} size={28} color={isFav ? "#FF7000" : "#fff"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => alert("Add to Playlist feature coming soon!")}>
          <MaterialCommunityIcons name="playlist-plus" size={28} color="#fff" />
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
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -5,
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

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { usePlayerStore } from '../store/usePlayerStore';

const MiniPlayer = () => {
  const navigation = useNavigation();
  const { currentTrack, isPlaying, pause, resume } = usePlayerStore();

  if (!currentTrack) return null; 

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Player')}
    >
      <Image source={{ uri: currentTrack.image }} style={styles.albumArt} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.artist}>{currentTrack.artist}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => isPlaying ? pause() : resume()}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={30} color="#dc773ce2" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
  },
  albumArt: {
    width: 45,
    height: 45,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    color: "#fff"
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#fff"
  },
  artist: {
    fontSize: 12,
    color: 'gray',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  }
});

export default MiniPlayer;
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MiniPlayer = () => {
  const navigation = useNavigation();

  // Mock data - eventually this will come from your Zustand store
  const currentTrack = {
    title: "Song Name",
    artist: "Artist Name",
    artwork: "https://via.placeholder.com/50"
  };

  if (!currentTrack) return null; // Hide if nothing is playing

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Player')}
    >
      <Image source={{ uri: currentTrack.artwork }} style={styles.albumArt} />
      
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{currentTrack.title}</Text>
        <Text style={styles.artist}>{currentTrack.artist}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => {/* Toggle Play/Pause */}}>
          <Ionicons name="play" size={30} color="#dc773ce2" />
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
    color:"#fff"
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color:"#fff"
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
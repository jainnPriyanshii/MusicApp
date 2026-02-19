import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavouriteScreen = () => {
  // Empty state example
  const favorites = []; 

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Favourites</Text>
        <TouchableOpacity>
          <Ionicons name="play-circle" size={50} color="#dc773ce2" />
        </TouchableOpacity>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={80} color="#333" />
          <Text style={styles.emptyText}>No liked songs yet.</Text>
        </View>
      ) : (
         <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }} 
              />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#b3b3b3', marginTop: 10, fontSize: 16 },
});

export default FavouriteScreen;
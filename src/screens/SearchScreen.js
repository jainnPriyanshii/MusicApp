
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { searchAll } from '../services/api';
import SongCard from '../components/SongCard';
import ArtistCard from '../components/ArtistCard';

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ songs: [], artists: [] });
    const [loading, setLoading] = useState(false);

    // Debounce search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.length > 2) {
                handleSearch(query);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSearch = async (text) => {
        setLoading(true);
        try {
            const data = await searchAll(text);
            // Assuming data structure contains songs and artists
            setResults({
                songs: data?.songs?.results || [],
                artists: data?.artists?.results || []
            });
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search songs, artists..."
                    placeholderTextColor="#666"
                    value={query}
                    onChangeText={setQuery}
                    autoFocus
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={() => setQuery('')}>
                        <Ionicons name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>

            {loading && <ActivityIndicator size="large" color="#FF7000" style={{ marginTop: 20 }} />}

            <FlatList
                data={[]} // Main list is empty, using ListHeaderComponent for sections to scroll together
                keyExtractor={() => "dummy"}
                ListHeaderComponent={
                    <>
                        {results.artists.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Artists</Text>
                                <FlatList
                                    horizontal
                                    data={results.artists}
                                    renderItem={({ item }) => (
                                        <ArtistCard
                                            artist={{
                                                name: decodeHtmlEntities(item.title || item.name),
                                                image: getImage(item.image),
                                            }}
                                            onPress={() => navigation.navigate("ArtistDetails", {
                                                artist: {
                                                    name: decodeHtmlEntities(item.title || item.name),
                                                    image: getImage(item.image),
                                                }
                                            })}
                                        />
                                    )}
                                    keyExtractor={(item) => item.id}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        )}

                        {results.songs.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Songs</Text>
                                {results.songs.map((item) => (
                                    <SongCard
                                        key={item.id}
                                        song={{
                                            title: decodeHtmlEntities(item.title),
                                            artist: decodeHtmlEntities(item.primaryArtists || item.description), // Description often has artist info in search results
                                            image: getImage(item.image),
                                        }}
                                        onPress={() => navigation.navigate("Player", {
                                            song: {
                                                title: decodeHtmlEntities(item.title),
                                                artist: decodeHtmlEntities(item.primaryArtists || item.description),
                                                image: getImage(item.image),
                                            }
                                        })}
                                    />
                                ))}
                            </View>
                        )}

                        {!loading && query.length > 2 && results.songs.length === 0 && results.artists.length === 0 && (
                            <Text style={styles.noResults}>No results found</Text>
                        )}
                    </>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#333',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 8,
        color: '#fff',
        marginHorizontal: 10,
        fontSize: 16,
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noResults: {
        color: '#666',
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
    }
});

export default SearchScreen;

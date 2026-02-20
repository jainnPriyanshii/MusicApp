import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLibraryStore = create(
    persist(
        (set, get) => ({
            favorites: [],
            playlists: [],

            toggleFavorite: (track) => {
                const { favorites } = get();
                console.log("Toggling favorite for:", track.title);
                const exists = favorites.find((t) => t.id === track.id);
                if (exists) {
                    console.log("Removing from favorites");
                    set({ favorites: favorites.filter((t) => t.id !== track.id) });
                } else {
                    console.log("Adding to favorites");
                    set({ favorites: [...favorites, track] });
                }
            },

            isFavorite: (trackId) => {
                return !!get().favorites.find(t => t.id === trackId);
            },

            createPlaylist: (name) => {
                const { playlists } = get();
                const newPlaylist = {
                    id: Date.now().toString(),
                    name,
                    tracks: []
                };
                set({ playlists: [...playlists, newPlaylist] });
            },

            addToPlaylist: (playlistId, track) => {
                const { playlists } = get();
                const updated = playlists.map(p => {
                    if (p.id === playlistId) {
                        // Avoid duplicates in playlist
                        if (p.tracks.find(t => t.id === track.id)) return p;
                        return { ...p, tracks: [...p.tracks, track] };
                    }
                    return p;
                });
                set({ playlists: updated });
            },

            removePlaylist: (id) => {
                set({ playlists: get().playlists.filter(p => p.id !== id) });
            }
        }),
        {
            name: "library-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

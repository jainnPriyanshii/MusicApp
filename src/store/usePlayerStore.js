import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      currentTrack: null,
      queue: [],
      isPlaying: false,

      setCurrentTrack: (track) => set({ currentTrack: track }),
      setQueue: (queue) => set({ queue }),
      setIsPlaying: (v) => set({ isPlaying: v }),

      playTrack: (track) => {
        set({ currentTrack: track, isPlaying: true });

        const queue = get().queue;
        if (!queue.find((t) => t.id === track.id)) {
          set({ queue: [track, ...queue] });
        }
      },

      pause: () => set({ isPlaying: false }),
      resume: () => set({ isPlaying: true }),

      addToQueue: (track) => {
        const existing = get().queue;
        if (!existing.find((t) => t.id === track.id)) {
          set({ queue: [...existing, track] });
        }
      },

      removeFromQueue: (id) => {
        const updated = get().queue.filter((t) => t.id !== id);
        set({ queue: updated });
      },
    }),
    {
      name: "player-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

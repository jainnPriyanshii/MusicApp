import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SoundService from "../services/SoundService";

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      currentTrack: null,
      queue: [],
      isPlaying: false,
      duration: 0,
      position: 0,

      setCurrentTrack: (track) => set({ currentTrack: track }),
      setQueue: (queue) => set({ queue }),
      setIsPlaying: (v) => set({ isPlaying: v }),

      setDuration: (duration) => set({ duration }),
      setPosition: (position) => set({ position }),

      playTrack: async (track) => {
        const { currentTrack } = get();
        const uri = track.preview_url || track.uri;

        
        const onPlaybackStatusUpdate = (status) => {
          if (status.isLoaded) {
            set({
              position: status.positionMillis,
              duration: status.durationMillis || 0,
              isPlaying: status.isPlaying
            });
          } else if (status.didJustFinish) {
            set({ isPlaying: false, position: 0 });
          }
        };

        SoundService.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

        if (currentTrack?.id !== track.id || !SoundService.isLoaded) {
          const success = await SoundService.loadSound(uri);
          if (success) {
            set({ currentTrack: track, isPlaying: true });
          } else {
            console.error("Failed to load sound for track:", track.title);
            return;
          }
        } else {
          await SoundService.playSound();
          set({ isPlaying: true });
        }

        const queue = get().queue;
        if (!queue.find((t) => t.id === track.id)) {
          set({ queue: [track, ...queue] });
        }
      },

      seek: async (positionMillis) => {
        await SoundService.seekTo(positionMillis);
        set({ position: positionMillis });
      },

      pause: async () => {
        await SoundService.pauseSound();
        set({ isPlaying: false });
      },

      resume: async () => {
        const { currentTrack } = get();
        if (!SoundService.isLoaded && currentTrack) {
          const uri = currentTrack.preview_url || currentTrack.uri;
          await SoundService.loadSound(uri);
          
          SoundService.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
              set({
                position: status.positionMillis,
                duration: status.durationMillis || 0,
                isPlaying: status.isPlaying
              });
            }
          });
        }
        await SoundService.playSound();
        set({ isPlaying: true });
      },

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

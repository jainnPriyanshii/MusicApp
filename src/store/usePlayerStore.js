import { create } from "zustand";

export const usePlayerStore = create((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,


  setCurrentTrack: (track) => set({ currentTrack: track }),
  setQueue: (queue) => set({ queue }),
  setIsPlaying: (v) => set({ isPlaying: v }),

  
  playTrack: (track) => {
    set({ currentTrack: track, isPlaying: true });
  },

  addToQueue: (track) => {
    const existing = get().queue;
    set({ queue: [...existing, track] });
  },

  removeFromQueue: (id) => {
    const updated = get().queue.filter((t) => t.id !== id);
    set({ queue: updated });
  },
}));

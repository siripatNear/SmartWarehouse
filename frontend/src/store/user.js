import create from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (v) => set({ user: v }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);

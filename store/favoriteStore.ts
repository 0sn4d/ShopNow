import { Product } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoritesState {
  favoriteItems: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  resetFavorite: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteItems: [],

      addFavorite: (product: Product) => {
        set((state) => ({
          favoriteItems: [...state.favoriteItems, product],
        }));
      },

      removeFavorite: (productId: number) => {
        set((state) => ({
          favoriteItems: state.favoriteItems.filter(
            (item) => item.id !== productId
          ),
        }));
      },

      toggleFavorite: (product: Product) => {
        const isFav = get().favoriteItems.some(
          (item) => item.id === product.id
        );
        set((state) => ({
          favoriteItems: isFav
            ? state.favoriteItems.filter((item) => item.id !== product.id)
            : [...state.favoriteItems, product],
        }));
      },

      isFavorite: (productId: number) => {
        return get().favoriteItems.some((item) => item.id === productId);
      },

      resetFavorite: () => {
        set(() => ({
          favoriteItems: [],
        }));
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

import {
  getCategory,
  getProducts,
  getProductsByCategory,
  postProduct,
  searchProductsApi,
} from "@/app/lib/api";
import { Product, ProductRequest } from "@/types";

import { create } from "zustand";

interface ProductsState {
  products: Product[];
  categories: string[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;

  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setCategory: (category: string | null) => Promise<void>;
  searchProducts: (query: string) => void;
  sortProducts: (sortBy: "price-asc" | "price-desc" | "rating" | "") => void;
  searchProductsRealTime: (query: string) => Promise<void>;
  postProduct: (productData: ProductRequest) => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  categories: [],
  filteredProducts: [],
  selectedCategory: null,
  loading: false,
  error: null,

  fetchProducts: async () => {
    try {
      set({ loading: true, error: null });
      const products = await getProducts();
      set({
        products: products,
        filteredProducts: products,
        loading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch products:", error);
      set({ loading: false, error: error.message });
    }
  },

  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const categories = await getCategory();
      set({ categories, loading: false });
    } catch (error: any) {
      console.error("Failed to fetch categories:", error);
    }
  },
  setCategory: async (category: string | null) => {
    try {
      set({ selectedCategory: category, loading: true, error: null });

      if (category) {
        const products = await getProductsByCategory(category);
        set({ filteredProducts: products, loading: false });
      } else {
        set({ filteredProducts: get().products, loading: false });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  searchProducts: (query: string) => {
    const searchTerm = query.toLowerCase().trim();
    const { products, selectedCategory } = get();
    let filtered = products;
    // If a category is selected, filter by category first
    if (selectedCategory) {
      filtered = products.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Then filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
    }

    set({ filteredProducts: filtered });
  },
  sortProducts: (sortBy: "price-asc" | "price-desc" | "rating" | "") => {
    const { filteredProducts } = get();
    let sorted = [...filteredProducts];

    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }
    set({ filteredProducts: sorted });
  },
  searchProductsRealTime: async (query: string) => {
    try {
      set({ loading: true, error: null });

      /*if (!query.trim()) {
        set({ filteredProducts: get().products, loading: false });
        return;
      }*/

      if (query?.length >= 3) {
        const searchResults = await searchProductsApi(query);
        set({ filteredProducts: searchResults, loading: false });
      } else {
        set({ filteredProducts: [], loading: false });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  postProduct: async (productData: ProductRequest) => {
    set({ loading: true, error: null });
    try {
      const newProduct = await postProduct(productData); // Call the API helper
      set((state) => ({
        products: [...state.products, newProduct],
        filteredProducts: [...state.filteredProducts, newProduct],
        loading: false,
      }));
      // 2. Or, refetch all products to ensure consistency (simpler for now)
      get().fetchProducts();
      set({ loading: false });
    } catch (error: any) {
      console.error("Failed to post product:", error);
      set({ loading: false, error: error.message || "Failed to add product" });
      throw error;
    }
  },
}));

import { create } from "zustand";
import { BACKEND_URL } from "@/app/lib/api";

interface User {
  id: number;
  name: string;
  email: string;
  isSeller: boolean;
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkSession: () => Promise<void>;

  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: false,
  error: null,

  signup: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    // Derive name from email
    const name = email.split("@")[0];

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await res.json();
      set({ user: data, isLoading: false });
    } catch (err: any) {
      console.error("Signup failed:", err);
      set({
        user: null,
        isLoading: false,
        error: err.message || "Signup failed",
      });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();
      set({ user: data, isLoading: false });
    } catch (err: any) {
      console.error("Login error:", err);
      set({
        user: null,
        isLoading: false,
        error: err.message || "Login failed",
      });
      throw err;
    }
  },

  logout: async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      set({ user: null });
    } catch (error: any) {
      console.error("Logout failed!");
    }
  },

  checkSession: async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/current`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        set({ user: data });
      } else {
        set({ user: null });
      }
    } catch (err) {
      console.error("Session check failed:", err);
    }
  },
}));

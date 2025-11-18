import { create } from "zustand";
import { checkAuth } from "../../api/auth.api";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  loading: false,
  initialized: false, // Add this flag
  user: null,

  checkUserAuth: async () => {
    // Skip if already initialized
    if (useAuthStore.getState().initialized) return;

    set({ loading: true });
    try {
      const data = await checkAuth();
      set({
        isAuthenticated: true,
        user: data?.data?.user || null,
        loading: false,
        initialized: true,
      });
    } catch (error) {
      set({
        isAuthenticated: false,
        user: null,
        loading: false,
        initialized: true,
      });
    }
  },

  login: (userData) => {
    localStorage.setItem("authToken", userData.authToken);
    set({
      isAuthenticated: true,
      user: userData,
      initialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem("authToken");
    set({
      isAuthenticated: false,
      user: null,
      initialized: true,
    });
  },
}));

export default useAuthStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";
import users from "../data/users.json";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        const foundUser = users.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          const { password, ...userToStore } = foundUser;
          set({ user: userToStore, isAuthenticated: true });
          return true;
        }

        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "fealtyx-auth-storage",

      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;

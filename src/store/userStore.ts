import { create } from "zustand";

interface UserStore {
  id: string;
  email: string;
  setUserData: (user: { id: string; email: string }) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  id: "cm9rek4yl0001ijaso8tzd0to",
  email: "",
  setUserData: (user) => set({ id: user.id, email: user.email }),
  clearUserData: () => set({ id: "", email: "" }),
}));

export const createAuthSlice = (set, get) => ({
  token: null,
  user: null,

  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),

  login: (userData, token) => {
    set({ user: userData, token });
  },

  logout: () => {
    set({ token: null, user: null });
  },
});
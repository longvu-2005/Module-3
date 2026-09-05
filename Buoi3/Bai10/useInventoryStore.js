import { create } from 'zustand';

export const useInventoryStore = create((set) => ({
  selectedItem: null,
  isSidebarOpen: false,

  openSidebar: (item) =>
    set({
      selectedItem: item,
      isSidebarOpen: true,
    }),

  closeSidebar: () =>
    set({
      selectedItem: null,
      isSidebarOpen: false,
    }),
}));
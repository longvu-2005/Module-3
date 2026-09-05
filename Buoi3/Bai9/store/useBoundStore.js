import { create } from 'zustand';
import { createAuthSlice } from './slices/createAuthSlice.js';
import { createUISlice } from './slices/createUISlice.js';

export const useBoundStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createUISlice(...a),
}));
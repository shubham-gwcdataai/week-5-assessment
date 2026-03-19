import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState, ProductCategory } from "../../types";

const initialState: UIState = {
  activeCategory: "all",
  menuOpen: false,
  currentSlide: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<ProductCategory | "all">) {
      state.activeCategory = action.payload;
    },
    toggleMenu(state) {
      state.menuOpen = !state.menuOpen;
    },
    closeMenu(state) {
      state.menuOpen = false;
    },
    setSlide(state, action: PayloadAction<number>) {
      state.currentSlide = action.payload;
    },
    nextSlide(state, action: PayloadAction<number>) {
      state.currentSlide = (state.currentSlide + 1) % action.payload;
    },
    prevSlide(state, action: PayloadAction<number>) {
      state.currentSlide = (state.currentSlide - 1 + action.payload) % action.payload;
    },
  },
});

export const { setCategory, toggleMenu, closeMenu, setSlide, nextSlide, prevSlide } = uiSlice.actions;
export const selectActiveCategory = (state: { ui: UIState }) => state.ui.activeCategory;
export const selectMenuOpen = (state: { ui: UIState }) => state.ui.menuOpen;
export const selectCurrentSlide = (state: { ui: UIState }) => state.ui.currentSlide;

export default uiSlice.reducer;

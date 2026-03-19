import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem, Product } from "../../types";

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const existing = state.items.find((i) => i.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((i) => i.product.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.product.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, toggleCart, openCart, closeCart } =
  cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }): CartItem[] => state.cart.items;
export const selectCartIsOpen = (state: { cart: CartState }): boolean => state.cart.isOpen;
export const selectCartTotal = (state: { cart: CartState }): number =>
  state.cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
export const selectCartCount = (state: { cart: CartState }): number =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export default cartSlice.reducer;

// ─── Product Types ────────────────────────────────────────────────────────────
export type ProductCategory = "soda" | "snack" | "juice";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  origin: string;
  imageUrl: string;
  bgColor: string;
  featured: boolean;
  rating: number;
  tags: string[];
}

// ─── Cart Types ───────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// ─── UI Types ─────────────────────────────────────────────────────────────────
export interface UIState {
  activeCategory: ProductCategory | "all";
  menuOpen: boolean;
  currentSlide: number;
}

// ─── API Response Types ───────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

// ─── Form Types ───────────────────────────────────────────────────────────────
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// ─── Store Type ───────────────────────────────────────────────────────────────
export interface RootState {
  cart: CartState;
  ui: UIState;
}

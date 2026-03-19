import { Product, ApiResponse } from "../types";

const DRINKS = {
  d1: "/assets/drink_1.avif",
  d2: "/assets/drink_2.avif",
  d3: "/assets/drink_3.avif",
  d4: "/assets/drink_4.avif",
  d5: "/assets/drink_5.avif",
  d6: "/assets/drink_6.avif",
  d7: "/assets/drink_7.avif",
  d8: "/assets/drink_8.avif",
};

const SNACKS = {
  s1: "/assets/snack_1.webp",
  s2: "/assets/snack_2.webp"
};

const PRODUCTS: Product[] = [
  {
    id: "soda-1",
    name: "Cherry Coconut Cream",
    description: "Classic Coke base with cherry syrup, coconut cream & lime — our #1 bestseller.",
    price: 6.99,
    category: "soda",
    origin: "US",
    imageUrl: DRINKS.d5,
    bgColor: "#FDE8E8",
    featured: true,
    rating: 4.9,
    tags: ["bestseller", "creamy", "sweet"],
  },
  {
    id: "soda-2",
    name: "Blue Raspberry Surge",
    description: "Electric blue raspberry soda with vanilla sweet cream and a hint of citrus zest.",
    price: 6.99,
    category: "soda",
    origin: "US",
    imageUrl: DRINKS.d7,
    bgColor: "#E0EEFF",
    featured: true,
    rating: 4.8,
    tags: ["fruity", "vibrant"],
  },
  {
    id: "soda-3",
    name: "Mango Habanero Fizz",
    description: "Tropical mango soda with a fiery habanero kick and a sweet cream finish.",
    price: 7.49,
    category: "soda",
    origin: "US",
    imageUrl: DRINKS.d6,
    bgColor: "#FFF3E0",
    featured: false,
    rating: 4.7,
    tags: ["spicy", "tropical"],
  },
  {
    id: "soda-4",
    name: "Coconut Lime Classic",
    description: "Our signature dirty soda — Coke base, coconut cream drizzle, fresh lime, ice.",
    price: 6.49,
    category: "soda",
    origin: "US",
    imageUrl: DRINKS.d2,
    bgColor: "#E8F5E9",
    featured: true,
    rating: 5.0,
    tags: ["signature", "creamy"],
  },
  {
    id: "soda-5",
    name: "Lemon Citrus Splash",
    description: "Bright and bubbly lemon citrus soda with a sweet sugar rim — pure sunshine.",
    price: 5.99,
    category: "soda",
    origin: "US",
    imageUrl: DRINKS.d8,
    bgColor: "#FFFDE7",
    featured: false,
    rating: 4.6,
    tags: ["refreshing", "citrusy"],
  },
  {
    id: "soda-6",
    name: "OG Dirty Classic",
    description: "The drink that started it all. Our original house dirty soda recipe.",
    price: 5.49,
    category: "soda",
    origin: "US",
    imageUrl: DRINKS.d1,
    bgColor: "#F3E5F5",
    featured: false,
    rating: 4.8,
    tags: ["original", "classic"],
  },

  // ── Exotic Snacks ──
  {
    id: "snack-1",
    name: "Miss Vicky's Spicy Pepperoni & Focaccia",
    description: "Bold Italian-inspired kettle chips with pepperoni and focaccia seasoning from Canada.",
    price: 4.99,
    category: "snack",
    origin: "CA",
    imageUrl: DRINKS.d3,
    bgColor: "#FFEBEE",
    featured: true,
    rating: 4.8,
    tags: ["spicy", "crunchy", "imported"],
  },
  {
    id: "snack-2",
    name: "Dubai Style Kadayif & Pistachio Chocolate",
    description: "The viral Dubai chocolate — shredded filo pastry, pistachio cream, dark chocolate shell.",
    price: 8.99,
    category: "snack",
    origin: "AE",
    imageUrl: SNACKS.s1,
    bgColor: "#FFF8E1",
    featured: true,
    rating: 5.0,
    tags: ["viral", "chocolate", "luxury"],
  },
  {
    id: "snack-3",
    name: "Korean Fire Noodle Chips",
    description: "Samyang-inspired fiery chip snacks with the iconic buldak sauce flavor.",
    price: 3.49,
    category: "snack",
    origin: "KR",
    imageUrl: SNACKS.s2,
    bgColor: "#FCE4EC",
    featured: false,
    rating: 4.7,
    tags: ["very spicy", "korean", "trending"],
  },

  // ── Juices ──
  {
    id: "juice-1",
    name: "Tropical Storm Juice",
    description: "Fresh-pressed pineapple, mango, guava and passion fruit. Pure tropics in a cup.",
    price: 5.99,
    category: "juice",
    origin: "US",
    imageUrl: DRINKS.d6,
    bgColor: "#FFF9C4",
    featured: false,
    rating: 4.8,
    tags: ["fresh", "tropical"],
  },
  {
    id: "juice-2",
    name: "Hibiscus Rose Lemonade",
    description: "Dried hibiscus flowers steeped and blended with fresh lemon and rose water.",
    price: 5.49,
    category: "juice",
    origin: "US",
    imageUrl: DRINKS.d5,
    bgColor: "#FCE4EC",
    featured: false,
    rating: 4.6,
    tags: ["floral", "refreshing"],
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const productApi = {
  getAll: async (): Promise<ApiResponse<Product[]>> => {
    await delay(500);
    return { data: PRODUCTS, success: true, message: "Products fetched" };
  },
  getById: async (id: string): Promise<ApiResponse<Product | null>> => {
    await delay(300);
    const product = PRODUCTS.find((p) => p.id === id) || null;
    return { data: product, success: !!product, message: product ? "Found" : "Not found" };
  },
  getByCategory: async (category: string): Promise<ApiResponse<Product[]>> => {
    await delay(400);
    const filtered = category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);
    return { data: filtered, success: true, message: "Filtered" };
  },
  getFeatured: async (): Promise<ApiResponse<Product[]>> => {
    await delay(400);
    return { data: PRODUCTS.filter((p) => p.featured), success: true, message: "Featured" };
  },
};

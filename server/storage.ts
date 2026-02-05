import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type CartItemWithProduct,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
}

// In-memory storage implementation (works without database)
export class InMemoryStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private products: Map<string, Product> = new Map();
  private cartItems: Map<string, CartItem> = new Map();

  constructor() {
    // Seed initial products
    const initialProducts: Product[] = [
      {
        id: "1",
        name: "BLUE Ultra Eau de Toilette",
        description: "A bold masculine fragrance with fresh citrus top notes, aromatic heart, and a warm woody base. 100ml of pure sophistication.",
        price: "350.00",
        scratchPrice: "550.00",
        image: "/assets/blue-ultra.png",
        category: "Eau de Toilette",
        gender: "male",
      },
      {
        id: "2",
        name: "Foschini All Woman Blush Eau de Parfum",
        description: "A delicate feminine fragrance with soft floral notes and a touch of elegance. The perfect scent for the sophisticated woman.",
        price: "280.00",
        scratchPrice: null,
        image: "/assets/perfume-female-1.webp",
        category: "Eau de Parfum",
        gender: "female",
      },
      {
        id: "3",
        name: "Foschini All Woman Blush Spritzer",
        description: "A light and refreshing body mist with the signature Blush scent. Perfect for everyday freshness.",
        price: "120.00",
        scratchPrice: null,
        image: "/assets/perfume-female-2.png",
        category: "Body Mist",
        gender: "female",
      },
      {
        id: "4",
        name: "Foschini All Woman Fire Eau de Parfum",
        description: "A bold and passionate fragrance with warm, sensual notes. For the woman who commands attention.",
        price: "320.00",
        scratchPrice: null,
        image: "/assets/perfume-female-3.png",
        category: "Eau de Parfum",
        gender: "female",
      },
      {
        id: "5",
        name: "Reflections Moonlit Kiss Eau de Toilette",
        description: "An enchanting evening fragrance with mysterious notes. Captivating and unforgettable.",
        price: "250.00",
        scratchPrice: null,
        image: "/assets/perfume-female-4.png",
        category: "Eau de Toilette",
        gender: "female",
      },
      {
        id: "6",
        name: "Oxy Anti-Spot Daily Scrub 125ml",
        description: "Gentle exfoliation that unblocks pores. Salicylic acid reduces appearance of inflamed skin. For soft & regenerated skin.",
        price: "110.00",
        scratchPrice: null,
        image: "/assets/oxy-anti-spot-scrub.jpg",
        category: "Scrubs",
        gender: "unisex",
      },
      {
        id: "7",
        name: "Oxy Regular Face Wash 150ml",
        description: "Daily face wash for healthy, clean skin. Removes dirt and oil while keeping skin fresh and hydrated.",
        price: "85.00",
        scratchPrice: null,
        image: "/assets/oxy-regular-face-wash.jpg",
        category: "Scrubs",
        gender: "unisex",
      },
    ];

    for (const product of initialProducts) {
      this.products.set(product.id, product);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: randomUUID(),
      ...insertUser,
    };
    this.users.set(user.id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct: Product = {
      id: randomUUID(),
      ...product,
      scratchPrice: product.scratchPrice ?? null,
    };
    this.products.set(newProduct.id, newProduct);
    return newProduct;
  }

  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );

    const itemsWithProducts: CartItemWithProduct[] = [];
    for (const item of items) {
      const product = await this.getProduct(item.productId);
      if (product) {
        itemsWithProducts.push({ ...item, product });
      }
    }
    return itemsWithProducts;
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const existing = Array.from(this.cartItems.values()).find(
      ci => ci.sessionId === item.sessionId && ci.productId === item.productId
    );

    if (existing) {
      const newQuantity = existing.quantity + (item.quantity || 1);
      existing.quantity = newQuantity;
      return existing;
    }

    const newItem: CartItem = {
      id: randomUUID(),
      sessionId: item.sessionId,
      productId: item.productId,
      quantity: item.quantity || 1,
    };
    this.cartItems.set(newItem.id, newItem);
    return newItem;
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return undefined;
  }

  async removeCartItem(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    for (const [id, item] of this.cartItems.entries()) {
      if (item.sessionId === sessionId) {
        this.cartItems.delete(id);
      }
    }
  }
}

export const storage = new InMemoryStorage();

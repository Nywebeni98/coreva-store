import { db } from "./db";
import { eq, and } from "drizzle-orm";
import {
  users,
  products,
  cartItems,
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

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.sessionId, sessionId));

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
    const existing = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.sessionId, item.sessionId),
          eq(cartItems.productId, item.productId)
        )
      );

    if (existing.length > 0) {
      const newQuantity = existing[0].quantity + (item.quantity || 1);
      const [updated] = await db
        .update(cartItems)
        .set({ quantity: newQuantity })
        .where(eq(cartItems.id, existing[0].id))
        .returning();
      return updated;
    }

    const [newItem] = await db.insert(cartItems).values(item).returning();
    return newItem;
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const [updated] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return updated;
  }

  async removeCartItem(id: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
  }
}

export const storage = new DatabaseStorage();

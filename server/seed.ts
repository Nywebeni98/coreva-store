import { db } from "./db";
import { products, cartItems } from "@shared/schema";

export async function seedDatabase() {
  try {
    const existingProducts = await db.select().from(products);
    
    // Check if we have the new women's products
    const hasNewProducts = existingProducts.some(p => p.name.includes("Foschini"));
    
    if (!hasNewProducts) {
      console.log("Updating database with new products...");
      
      // Clear cart items first (foreign key constraint)
      await db.delete(cartItems);
      
      // Clear old products
      await db.delete(products);
      
      // Insert new women's perfumes
      await db.insert(products).values([
        {
          name: "Foschini All Woman Blush Eau de Parfum",
          description: "A delicate feminine fragrance with soft floral notes and a touch of elegance. The perfect scent for the sophisticated woman.",
          price: "280.00",
          image: "/assets/perfume-female-1.webp",
          category: "Eau de Parfum",
          gender: "female",
        },
        {
          name: "Foschini All Woman Blush Spritzer",
          description: "A light and refreshing body mist with the signature Blush scent. Perfect for everyday freshness.",
          price: "120.00",
          image: "/assets/perfume-female-2.png",
          category: "Body Mist",
          gender: "female",
        },
        {
          name: "Foschini All Woman Fire Eau de Parfum",
          description: "A bold and passionate fragrance with warm, sensual notes. For the woman who commands attention.",
          price: "320.00",
          image: "/assets/perfume-female-3.png",
          category: "Eau de Parfum",
          gender: "female",
        },
        {
          name: "Reflections Moonlit Kiss Eau de Toilette",
          description: "An enchanting evening fragrance with mysterious notes. Captivating and unforgettable.",
          price: "250.00",
          image: "/assets/perfume-female-4.png",
          category: "Eau de Toilette",
          gender: "female",
        },
      ]);
      
      console.log("Database updated with new products!");
    } else {
      console.log("Database already has correct products.");
    }
  } catch (error) {
    console.error("Seed error:", error);
    // Don't crash the app if seeding fails
  }
}

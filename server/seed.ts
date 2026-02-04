import { db } from "./db";
import { products, cartItems } from "@shared/schema";

export async function seedDatabase() {
  try {
    const existingProducts = await db.select().from(products);
    
    const hasScrubs = existingProducts.some(p => p.name.includes("Oxy"));
    
    if (!hasScrubs) {
      console.log("Updating database with new products...");
      
      await db.delete(cartItems);
      await db.delete(products);
      
      await db.insert(products).values([
        {
          name: "BLUE Ultra Eau de Toilette",
          description: "A bold masculine fragrance with fresh citrus top notes, aromatic heart, and a warm woody base. 100ml of pure sophistication.",
          price: "350.00",
          scratchPrice: "550.00",
          image: "/assets/blue-ultra.png",
          category: "Eau de Toilette",
          gender: "male",
        },
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
        {
          name: "Oxy Anti-Spot Daily Scrub 125ml",
          description: "Gentle exfoliation that unblocks pores. Salicylic acid reduces appearance of inflamed skin. For soft & regenerated skin.",
          price: "110.00",
          image: "/assets/oxy-anti-spot-scrub.jpg",
          category: "Scrubs",
          gender: "unisex",
        },
        {
          name: "Oxy Regular Face Wash 150ml",
          description: "Daily face wash for healthy, clean skin. Removes dirt and oil while keeping skin fresh and hydrated.",
          price: "85.00",
          image: "/assets/oxy-regular-face-wash.jpg",
          category: "Scrubs",
          gender: "unisex",
        },
      ]);
      
      console.log("Database updated with new products!");
    } else {
      console.log("Database already has correct products.");
    }
  } catch (error) {
    console.error("Seed error:", error);
  }
}

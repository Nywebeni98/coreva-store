import { db } from "./db";
import { products } from "@shared/schema";
import { sql } from "drizzle-orm";

export async function seedDatabase() {
  const existingProducts = await db.select().from(products);
  
  // Check if we have the new women's products
  const hasNewProducts = existingProducts.some(p => p.name.includes("Foschini"));
  
  if (!hasNewProducts) {
    console.log("Updating database with new products...");
    
    // Clear old products
    await db.delete(products);
    
    // Insert new women's perfumes
    await db.insert(products).values([
      {
        name: "Foschini All Woman Blush Eau de Parfum",
        description: "A delicate feminine fragrance with soft floral notes and a touch of elegance. The perfect scent for the sophisticated woman.",
        price: "280.00",
        image: "/assets/Foschini_All_Woman_Blush_Eau_de_parfum_1769980024398.webp",
        category: "Eau de Parfum",
        gender: "female",
      },
      {
        name: "Foschini All Woman Blush Spritzer",
        description: "A light and refreshing body mist with the signature Blush scent. Perfect for everyday freshness.",
        price: "120.00",
        image: "/assets/Foschini_All_Woman_Blush_Spritzer_1769980024401.png",
        category: "Body Mist",
        gender: "female",
      },
      {
        name: "Foschini All Woman Fire Eau de Parfum",
        description: "A bold and passionate fragrance with warm, sensual notes. For the woman who commands attention.",
        price: "320.00",
        image: "/assets/Foschini_All_Woman_Fire_Eau_De_Parfum_1769980024401.png",
        category: "Eau de Parfum",
        gender: "female",
      },
      {
        name: "Reflections Moonlit Kiss Eau de Toilette",
        description: "An enchanting evening fragrance with mysterious notes. Captivating and unforgettable.",
        price: "250.00",
        image: "/assets/Reflections_Moonlight_Kiss_Eau_de_Toilette_1769980024402.png",
        category: "Eau de Toilette",
        gender: "female",
      },
    ]);
    
    console.log("Database updated with new products!");
  } else {
    console.log("Database already has correct products.");
  }
}

import { db } from "./db";
import { products } from "@shared/schema";

export async function seedDatabase() {
  const existingProducts = await db.select().from(products);
  
  if (existingProducts.length === 0) {
    console.log("Seeding database with initial products...");
    
    await db.insert(products).values([
      {
        name: "Bleu Ultra",
        description: "A sophisticated masculine fragrance with notes of citrus, cedar, and musk. Perfect for the modern gentleman who appreciates timeless elegance.",
        price: "350.00",
        image: "/assets/BLUE-Ultra-Eau-de-Toilette-BLUE-504649266_1769885770315.jpg",
        category: "Perfume",
        gender: "male",
      },
      {
        name: "Good Luck",
        description: "An enchanting floral fragrance for women, blending notes of rose, jasmine, and vanilla. A lucky charm in every spray.",
        price: "150.00",
        image: "/assets/w_perfume_1769885891521.jfif",
        category: "Perfume",
        gender: "female",
      },
    ]);
    
    console.log("Database seeded successfully!");
  } else {
    console.log("Database already has products, skipping seed.");
  }
}

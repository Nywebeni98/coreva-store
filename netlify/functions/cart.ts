import type { Handler } from "@netlify/functions";

interface CartItem {
  id: string;
  sessionId: string;
  productId: number;
  quantity: number;
}

const carts = new Map<string, CartItem[]>();
let nextId = 1;

const products = [
  { id: 1, name: "BLUE Ultra Eau de Toilette", price: "350.00", scratchPrice: "550.00", image: "/assets/blue-ultra.png", category: "Eau de Toilette", gender: "male", description: "A bold masculine fragrance." },
  { id: 2, name: "Foschini All Woman Blush Eau de Parfum", price: "280.00", scratchPrice: null, image: "/assets/perfume-female-1.webp", category: "Eau de Parfum", gender: "female", description: "A delicate feminine fragrance." },
  { id: 3, name: "Foschini All Woman Blush Spritzer", price: "120.00", scratchPrice: null, image: "/assets/perfume-female-2.png", category: "Body Mist", gender: "female", description: "A light and refreshing body mist." },
  { id: 4, name: "Foschini All Woman Fire Eau de Parfum", price: "320.00", scratchPrice: null, image: "/assets/perfume-female-3.png", category: "Eau de Parfum", gender: "female", description: "A bold and passionate fragrance." },
  { id: 5, name: "Reflections Moonlit Kiss Eau de Toilette", price: "250.00", scratchPrice: null, image: "/assets/perfume-female-4.png", category: "Eau de Toilette", gender: "female", description: "An enchanting evening fragrance." },
  { id: 6, name: "Oxy Anti-Spot Daily Scrub 125ml", price: "110.00", scratchPrice: null, image: "/assets/oxy-anti-spot-scrub.jpg", category: "Scrubs", gender: "unisex", description: "Gentle exfoliation scrub." },
  { id: 7, name: "Oxy Regular Face Wash 150ml", price: "85.00", scratchPrice: null, image: "/assets/oxy-regular-face-wash.jpg", category: "Scrubs", gender: "unisex", description: "Daily face wash." },
];

export const handler: Handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod === "GET") {
    const sessionId = event.queryStringParameters?.sessionId;
    if (!sessionId) {
      return { statusCode: 200, headers, body: JSON.stringify([]) };
    }
    const items = carts.get(sessionId) || [];
    const itemsWithProducts = items.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId),
    }));
    return { statusCode: 200, headers, body: JSON.stringify(itemsWithProducts) };
  }

  if (event.httpMethod === "POST") {
    const { sessionId, productId, quantity = 1 } = JSON.parse(event.body || "{}");
    if (!carts.has(sessionId)) carts.set(sessionId, []);
    const items = carts.get(sessionId)!;
    const existing = items.find(i => i.productId === productId);
    if (existing) {
      existing.quantity += quantity;
      return { statusCode: 200, headers, body: JSON.stringify(existing) };
    }
    const newItem: CartItem = { id: String(nextId++), sessionId, productId, quantity };
    items.push(newItem);
    return { statusCode: 200, headers, body: JSON.stringify(newItem) };
  }

  if (event.httpMethod === "DELETE") {
    const sessionId = event.queryStringParameters?.sessionId;
    if (sessionId) {
      carts.delete(sessionId);
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Session ID required" }) };
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
};

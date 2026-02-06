import type { Handler } from "@netlify/functions";

const products = [
  {
    id: 1,
    name: "BLUE Ultra Eau de Toilette",
    description: "A bold masculine fragrance with fresh citrus top notes, aromatic heart, and a warm woody base. 100ml of pure sophistication.",
    price: "350.00",
    scratchPrice: "550.00",
    image: "/assets/blue-ultra.png",
    category: "Eau de Toilette",
    gender: "male",
  },
  {
    id: 2,
    name: "Foschini All Woman Blush Eau de Parfum",
    description: "A delicate feminine fragrance with soft floral notes and a touch of elegance. The perfect scent for the sophisticated woman.",
    price: "280.00",
    scratchPrice: null,
    image: "/assets/perfume-female-1.webp",
    category: "Eau de Parfum",
    gender: "female",
  },
  {
    id: 3,
    name: "Foschini All Woman Blush Spritzer",
    description: "A light and refreshing body mist with the signature Blush scent. Perfect for everyday freshness.",
    price: "120.00",
    scratchPrice: null,
    image: "/assets/perfume-female-2.png",
    category: "Body Mist",
    gender: "female",
  },
  {
    id: 4,
    name: "Foschini All Woman Fire Eau de Parfum",
    description: "A bold and passionate fragrance with warm, sensual notes. For the woman who commands attention.",
    price: "320.00",
    scratchPrice: null,
    image: "/assets/perfume-female-3.png",
    category: "Eau de Parfum",
    gender: "female",
  },
  {
    id: 5,
    name: "Reflections Moonlit Kiss Eau de Toilette",
    description: "An enchanting evening fragrance with mysterious notes. Captivating and unforgettable.",
    price: "250.00",
    scratchPrice: null,
    image: "/assets/perfume-female-4.png",
    category: "Eau de Toilette",
    gender: "female",
  },
  {
    id: 6,
    name: "Oxy Anti-Spot Daily Scrub 125ml",
    description: "Gentle exfoliation that unblocks pores. Salicylic acid reduces appearance of inflamed skin. For soft & regenerated skin.",
    price: "110.00",
    scratchPrice: null,
    image: "/assets/oxy-anti-spot-scrub.jpg",
    category: "Scrubs",
    gender: "unisex",
  },
  {
    id: 7,
    name: "Oxy Regular Face Wash 150ml",
    description: "Daily face wash for healthy, clean skin. Removes dirt and oil while keeping skin fresh and hydrated.",
    price: "85.00",
    scratchPrice: null,
    image: "/assets/oxy-regular-face-wash.jpg",
    category: "Scrubs",
    gender: "unisex",
  },
];

export const handler: Handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod === "GET") {
    const id = event.path.split("/").pop();
    if (id && !isNaN(Number(id))) {
      const product = products.find(p => p.id === Number(id));
      if (product) {
        return { statusCode: 200, headers, body: JSON.stringify(product) };
      }
      return { statusCode: 404, headers, body: JSON.stringify({ error: "Product not found" }) };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(products),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};

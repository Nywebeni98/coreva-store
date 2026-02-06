import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/header";
import { ProductCard } from "../components/product-card";
import { CartSheet } from "../components/cart-sheet";
import { Skeleton } from "../components/ui/skeleton";
import { Separator } from "../components/ui/separator";
import type { Product } from "@shared/schema";

const staticProducts: Product[] = [
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

export default function Shop() {
  const [cartOpen, setCartOpen] = useState(false);

  const { data: apiProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    retry: 1,
  });

  const products = (apiProducts && apiProducts.length > 0) ? apiProducts : staticProducts;

  const menProducts = products.filter(p => p.gender === "male");
  const womenProducts = products.filter(p => p.gender === "female");
  const scrubProducts = products.filter(p => p.category === "Scrubs");

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="container px-4 md:px-6 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-shop-title">
            Shop Our Collection
          </h1>
          <Separator className="w-24 mx-auto bg-secondary h-1 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Browse our curated selection of premium fragrances and skincare at unbeatable prices.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {menProducts.length > 0 && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">For Him</h2>
                  <p className="text-muted-foreground mt-2">Masculine fragrances for the modern gentleman</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="grid-men-products">
                  {menProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {womenProducts.length > 0 && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">For Her</h2>
                  <p className="text-muted-foreground mt-2">Elegant perfumes for every occasion</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="grid-women-products">
                  {womenProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {scrubProducts.length > 0 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Scrubs & Skincare</h2>
                  <p className="text-muted-foreground mt-2">Daily essentials for healthy, glowing skin</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="grid-scrubs-products">
                  {scrubProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}

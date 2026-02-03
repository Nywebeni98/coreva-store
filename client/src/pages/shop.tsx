import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/header";
import { ProductCard } from "../components/product-card";
import { CartSheet } from "../components/cart-sheet";
import { Skeleton } from "../components/ui/skeleton";
import { Separator } from "../components/ui/separator";
import type { Product } from "@shared/schema";

export default function Shop() {
  const [cartOpen, setCartOpen] = useState(false);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const menProducts = products?.filter(p => p.gender === "male") || [];
  const womenProducts = products?.filter(p => p.gender === "female") || [];

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
            Browse our curated selection of premium fragrances at unbeatable prices.
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
              <div>
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
          </>
        )}
      </main>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}

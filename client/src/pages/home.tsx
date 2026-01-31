import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { CartSheet } from "@/components/cart-sheet";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />
      <Hero />

      <main className="container px-4 md:px-6 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight" data-testid="text-section-title">
              Our Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hand-picked fragrances for every occasion
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-md" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-products">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available yet.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t bg-muted/30 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Coreva Online Store. All prices in South African Rand (ZAR).
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Premium Quality</span>
              <span>Fast Delivery</span>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </footer>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}

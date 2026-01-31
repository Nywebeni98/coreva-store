import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { CartSheet } from "@/components/cart-sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
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

      <main className="container px-4 md:px-6">
        <section className="py-16 md:py-24">
          <div className="text-center space-y-4 mb-12">
            <p className="text-secondary font-semibold uppercase tracking-[0.2em] text-sm">
              Exclusive Scents
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-section-title">
              Our Collection
            </h2>
            <Separator className="w-24 mx-auto bg-secondary h-1 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Hand-picked fragrances for every occasion. Each perfume is crafted with the finest ingredients to create an unforgettable experience.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-10 w-36" />
                  </div>
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" data-testid="grid-products">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available yet.</p>
            </div>
          )}
        </section>

        <section className="py-16 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary">01</span>
              </div>
              <h3 className="font-semibold text-lg">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">
                Only the finest ingredients sourced from around the world
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary">02</span>
              </div>
              <h3 className="font-semibold text-lg">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Swift and secure delivery right to your doorstep
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary">03</span>
              </div>
              <h3 className="font-semibold text-lg">Satisfaction Guaranteed</h3>
              <p className="text-muted-foreground text-sm">
                Love your fragrance or we'll make it right
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-primary text-primary-foreground py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Coreva Store</h4>
              <p className="text-primary-foreground/70 text-sm">
                Premium fragrances for those who appreciate the finer things in life.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
                <span className="hover:text-primary-foreground cursor-pointer">Home</span>
                <span className="hover:text-primary-foreground cursor-pointer">About Us</span>
                <span className="hover:text-primary-foreground cursor-pointer">Shop</span>
                <span className="hover:text-primary-foreground cursor-pointer">Contact</span>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
                <span>South Africa</span>
                <span>Prices in ZAR (R)</span>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-primary-foreground/20" />
          <p className="text-center text-sm text-primary-foreground/60">
            Coreva Online Store. All rights reserved.
          </p>
        </div>
      </footer>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}

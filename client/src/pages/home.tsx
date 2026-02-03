import { useState } from "react";
import { Header } from "../components/header";
import { CartSheet } from "../components/cart-sheet";
import { PhotoCarousel } from "../components/photo-carousel";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Link } from "wouter";
import { ArrowRight, ShoppingCart, Package, Truck, Tag, Star } from "lucide-react";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />

      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-accent blur-3xl" />
        </div>
        
        <div className="container relative px-4 md:px-6 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-secondary font-semibold uppercase tracking-[0.3em] text-sm">
              Smart Shopping
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary-foreground leading-tight" data-testid="text-hero-title">
              Everything You Need.
              <br />
              <span className="text-secondary">One Combo. One Price.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
              Shop combo deals on cereals, perfumes, household essentials, pest control and more — all at unbeatable prices.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg" variant="secondary" className="gap-2 text-base px-8" data-testid="button-shop-combos">
                  <ShoppingCart className="h-5 w-5" />
                  Shop Combos
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-view-deals">
                  View Deals
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <PhotoCarousel />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" data-testid="text-why-choose">
              Why Choose Coreva Store?
            </h2>
            <Separator className="w-24 mx-auto bg-secondary h-1 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <Tag className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-bold text-xl">Discounted Combos</h3>
                <p className="text-muted-foreground">
                  Save more when you buy everyday items together.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <Package className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-bold text-xl">Everything in One Place</h3>
                <p className="text-muted-foreground">
                  Food, fragrance, and household essentials — no need to shop around.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-8 pb-6 px-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-bold text-xl">Convenient Shopping</h3>
                <p className="text-muted-foreground">
                  Order online and get value delivered to you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <p className="text-secondary font-semibold uppercase tracking-[0.2em] text-sm">
              Best Sellers
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight" data-testid="text-featured-combos">
              Popular Combo Deals
            </h2>
            <Separator className="w-24 mx-auto bg-secondary h-1 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked bundles designed to save you money on items you use every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-lg hover-elevate">
              <div className="aspect-video relative overflow-hidden">
                <img src="/assets/cereals-combo.jpeg" alt="Breakfast Combo" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Breakfast Combo</h3>
                <p className="text-muted-foreground text-sm">Cereals + essentials for the whole family</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-lg hover-elevate">
              <div className="aspect-video relative overflow-hidden">
                <img src="/assets/skincare-combo.jpeg" alt="Fresh & Fragrance Combo" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Fresh & Fragrance Combo</h3>
                <p className="text-muted-foreground text-sm">Perfumes at discounted prices</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-lg hover-elevate">
              <div className="aspect-video relative overflow-hidden">
                <img src="/assets/pest-control.jpeg" alt="Home Care Combo" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Home Care Combo</h3>
                <p className="text-muted-foreground text-sm">Cleaning & pest control essentials</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We focus on value. No complicated pricing. Just smart deals on everyday products.
            </p>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-6 w-6 fill-secondary text-secondary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Trusted by customers who love saving</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Save More?
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Browse our combo deals and get more for less today.
            </p>
            <Link href="/shop">
              <Button size="lg" variant="secondary" className="gap-2 text-base px-8" data-testid="button-shop-now-cta">
                <ShoppingCart className="h-5 w-5" />
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t bg-background py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Coreva Store</h4>
              <p className="text-muted-foreground text-sm">
                Your one-stop shop for everyday essentials at unbeatable prices.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Quick Links</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground cursor-pointer">Home</Link>
                <Link href="/about" className="hover:text-foreground cursor-pointer">About Us</Link>
                <Link href="/shop" className="hover:text-foreground cursor-pointer">Shop</Link>
                <Link href="/contact" className="hover:text-foreground cursor-pointer">Contact</Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span>South Africa</span>
                <span>Prices in ZAR (R)</span>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-sm text-muted-foreground">
            Coreva Online Store. All rights reserved.
          </p>
        </div>
      </footer>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}

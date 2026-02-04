import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-accent blur-3xl" />
      </div>
      
      <div className="container relative px-4 md:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-secondary font-semibold uppercase tracking-wider text-sm">
              <Sparkles className="h-4 w-4" />
              Smart Shopping
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground leading-tight" data-testid="text-hero-title">
              Everything You Need.
              <br />
              <span className="text-secondary">One Combo. One Price.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl leading-relaxed" data-testid="text-hero-subtitle">
              Shop combo deals on cereals, perfumes, household essentials, pest control and more — all at unbeatable prices.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 pt-2">
              <Link href="/shop">
                <Button size="lg" variant="secondary" className="gap-2 text-base px-8" data-testid="button-shop-combos">
                  Shop Combos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-view-deals">
                  View Deals
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <img 
              src="/assets/hero-combo.png" 
              alt="Combo deals featuring cereals, perfumes, and skincare products"
              className="w-full max-w-lg object-contain drop-shadow-2xl"
              data-testid="img-hero-combo"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    </section>
  );
}

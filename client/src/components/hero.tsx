import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-accent blur-3xl" />
      </div>
      
      <div className="container relative px-4 md:px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-secondary font-semibold uppercase tracking-[0.3em] text-sm">
            Premium Collection
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary-foreground leading-[0.9]" data-testid="text-hero-title">
            The Art of
            <br />
            <span className="italic font-light">Fragrance</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
            Discover scents that tell your story. Our curated collection of premium perfumes captures the essence of elegance and sophistication.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" variant="secondary" className="gap-2 text-base px-8" data-testid="button-shop-now">
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-explore">
              Explore Collection
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    </section>
  );
}

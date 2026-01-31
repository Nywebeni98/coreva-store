import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-secondary blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-accent blur-3xl" />
      </div>
      
      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-primary-foreground">Premium Fragrances</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary-foreground max-w-3xl" data-testid="text-hero-title">
            Discover Your Signature Scent
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl" data-testid="text-hero-subtitle">
            Explore our exclusive collection of premium perfumes crafted for those who appreciate the art of fragrance.
          </p>
        </div>
      </div>
    </section>
  );
}

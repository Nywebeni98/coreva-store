import { useState } from "react";
import { Header } from "../components/header";
import { CartSheet } from "../components/cart-sheet";
import { Separator } from "../components/ui/separator";
import { Card, CardContent } from "../components/ui/card";
import { ShoppingBag, Truck, ThumbsUp } from "lucide-react";

export default function About() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="container px-4 md:px-6 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" data-testid="text-about-title">
            About Coreva Store
          </h1>
          <Separator className="w-24 mx-auto bg-secondary h-1 rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed text-center">
            Coreva Store is your one-stop shop for everyday essentials at unbeatable prices. 
            We believe in providing value through smart combo deals on products you use daily.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center p-6">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg">Wide Selection</h3>
                <p className="text-muted-foreground text-sm">
                  From perfumes to cereals, household essentials to pest control - we have it all.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg">Fast Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Quick and reliable delivery right to your doorstep across South Africa.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <ThumbsUp className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg">Quality Products</h3>
                <p className="text-muted-foreground text-sm">
                  We only stock trusted brands that our customers love.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Our Promise</h2>
            <p className="text-muted-foreground leading-relaxed">
              We focus on value. No complicated pricing. Just smart deals on everyday products.
              Shop with confidence knowing you're getting the best prices in South Africa.
            </p>
          </div>
        </div>
      </main>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}

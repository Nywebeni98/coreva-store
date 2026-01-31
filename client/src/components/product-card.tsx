import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@shared/schema";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formatPrice = (price: string) => {
    return `R${parseFloat(price).toFixed(2)}`;
  };

  return (
    <Card className="group overflow-visible hover-elevate border-0 shadow-lg" data-testid={`card-product-${product.id}`}>
      <div className="relative aspect-square overflow-hidden rounded-t-md bg-gradient-to-br from-muted to-muted/50">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          data-testid={`img-product-${product.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge
          className="absolute top-4 left-4 bg-primary text-primary-foreground"
          data-testid={`badge-gender-${product.id}`}
        >
          {product.gender === "male" ? "For Him" : "For Her"}
        </Badge>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            {product.category}
          </p>
          <h3 className="font-bold text-2xl tracking-tight" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-muted-foreground leading-relaxed" data-testid={`text-desc-${product.id}`}>
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Price</p>
            <span className="text-2xl font-bold text-secondary" data-testid={`text-price-${product.id}`}>
              {formatPrice(product.price)}
            </span>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            size="lg"
            className="gap-2"
            data-testid={`button-add-cart-${product.id}`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

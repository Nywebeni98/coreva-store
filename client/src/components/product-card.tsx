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
    <Card className="group overflow-visible hover-elevate" data-testid={`card-product-${product.id}`}>
      <div className="relative aspect-square overflow-hidden rounded-t-md bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          data-testid={`img-product-${product.id}`}
        />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3"
          data-testid={`badge-gender-${product.id}`}
        >
          {product.gender === "male" ? "For Him" : "For Her"}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-desc-${product.id}`}>
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-secondary" data-testid={`text-price-${product.id}`}>
              {formatPrice(product.price)}
            </span>
            <Button
              onClick={handleAddToCart}
              disabled={isLoading}
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
        </div>
      </CardContent>
    </Card>
  );
}

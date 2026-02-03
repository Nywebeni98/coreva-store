import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <div className="relative aspect-square overflow-hidden rounded-t-md bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          data-testid={`img-product-${product.id}`}
        />
      </div>
      <CardContent className="p-3 space-y-2 bg-[#2B2E34] text-white rounded-b-md">
        <h3 className="font-medium text-xs leading-tight line-clamp-2" data-testid={`text-name-${product.id}`}>
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {product.scratchPrice && (
              <span className="text-xs text-gray-400 line-through" data-testid={`text-scratch-price-${product.id}`}>
                {formatPrice(product.scratchPrice)}
              </span>
            )}
            <span className="text-sm font-bold text-[#F5A623]" data-testid={`text-price-${product.id}`}>
              {formatPrice(product.price)}
            </span>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            size="sm"
            className="bg-white text-[#1F4D88] border border-[#1F4D88] hover:bg-white/90 rounded-none text-xs px-2 h-7"
            data-testid={`button-add-cart-${product.id}`}
          >
            {added ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

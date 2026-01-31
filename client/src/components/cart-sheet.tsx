import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/lib/cart-context";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, isLoading } = useCart();

  const formatPrice = (price: number | string) => {
    return `R${parseFloat(String(price)).toFixed(2)}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg" data-testid="sheet-cart">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-lg" data-testid="text-empty-cart">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add some fragrances to get started
              </p>
            </div>
            <Button onClick={() => onOpenChange(false)} data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                    data-testid={`cart-item-${item.id}`}
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate" data-testid={`text-cart-item-name-${item.id}`}>
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.product.price)} each
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoading}
                          data-testid={`button-decrease-${item.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium" data-testid={`text-quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          data-testid={`button-increase-${item.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-destructive"
                          onClick={() => removeFromCart(item.id)}
                          disabled={isLoading}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold" data-testid={`text-item-total-${item.id}`}>
                        {formatPrice(Number(item.product.price) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4">
              <Separator />
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span data-testid="text-cart-total">{formatPrice(totalPrice)}</span>
              </div>
              <Button className="w-full" size="lg" data-testid="button-checkout">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

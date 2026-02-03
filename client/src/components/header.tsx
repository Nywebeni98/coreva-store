import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import logoImage from "/assets/logo.png";

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="Coreva Store"
              className="h-16 md:h-20 w-auto object-contain"
              data-testid="img-logo"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <span className="text-sm font-semibold uppercase tracking-wide text-foreground hover:text-secondary transition-colors cursor-pointer" data-testid="link-home">
              Home
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:text-secondary transition-colors cursor-pointer" data-testid="link-about">
              About
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:text-secondary transition-colors cursor-pointer" data-testid="link-shop">
              Shop
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground hover:text-secondary transition-colors cursor-pointer" data-testid="link-contact">
              Contact Us
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={onCartClick}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-secondary text-secondary-foreground"
                  data-testid="badge-cart-count"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

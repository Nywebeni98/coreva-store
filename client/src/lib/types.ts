export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  scratchPrice: string | null;
  image: string;
  category: string;
  gender: string;
}

export interface CartItem {
  id: string;
  sessionId: string;
  productId: string;
  quantity: number;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

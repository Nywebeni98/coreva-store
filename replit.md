# Coreva Store - Online Perfume Shop

## Overview
Coreva Store is an online e-commerce store specializing in premium fragrances. The store features a modern, elegant design with colors inspired by the brand logo (dark navy blue, orange, and light blue).

## Current Features
- Product catalog displaying perfumes for men and women
- Shopping cart with session-based persistence
- Add to cart, update quantity, and remove items functionality
- Responsive design for all screen sizes
- Prices displayed in South African Rand (ZAR)

## Products
1. **Bleu Ultra** - R350.00 - Masculine fragrance with citrus, cedar, and musk notes
2. **Good Luck** - R150.00 - Feminine fragrance with rose, jasmine, and vanilla notes

## Tech Stack
- **Frontend**: React with TypeScript, TanStack Query, Wouter router
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with custom theme colors

## Project Structure
```
client/src/
├── components/       # Reusable UI components
│   ├── header.tsx   # Store header with logo and cart
│   ├── hero.tsx     # Hero section banner
│   ├── product-card.tsx  # Product display cards
│   └── cart-sheet.tsx    # Shopping cart drawer
├── lib/
│   └── cart-context.tsx  # Cart state management
├── pages/
│   └── home.tsx     # Main store page
└── App.tsx          # App entry point

server/
├── db.ts            # Database connection
├── routes.ts        # API endpoints
├── storage.ts       # Data access layer
├── seed.ts          # Initial product data
└── index.ts         # Server entry point

shared/
└── schema.ts        # Database schemas and types
```

## API Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/cart?sessionId=` - Get cart items for session
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart/clear?sessionId=` - Clear entire cart

## Theme Colors
- **Primary**: Dark navy blue (#1a2f4a)
- **Secondary**: Orange (#f5a623)
- **Accent**: Light blue (#3bb8e0)

# Coreva Store - Online Essentials Shop

## Overview
Coreva Store is an online e-commerce store specializing in everyday essentials including perfumes, cereals, household items, and pest control products. The store features a magazine-style elegant design with combo deals at unbeatable prices. All prices are in South African Rand (ZAR).

## Current Features
- Multi-page layout with Home, About, Shop, and Contact pages
- Product catalog with men's and women's perfumes
- Scratch price display (original price crossed out, discounted price shown)
- Shopping cart with session-based persistence
- Rotating photo carousel on homepage (3-second intervals)
- Responsive design with mobile navigation menu
- Contact form

## Pages
- **Home** (/) - Hero section, photo carousel, "Why Choose Us", Popular Combos, Trust section, CTA
- **Shop** (/shop) - Full product catalog with "For Him" and "For Her" sections
- **About** (/about) - Company information and features
- **Contact** (/contact) - Contact form and information

## Products
1. **BLUE Ultra Eau de Toilette** - R350.00 (was R550.00) - Masculine fragrance with citrus, cedar, and musk notes
2. **Foschini All Woman Blush Eau de Parfum** - R280.00 - Feminine floral fragrance
3. **Foschini All Woman Blush Spritzer** - R120.00 - Light feminine fragrance
4. **Foschini All Woman Fire Eau de Parfum** - R320.00 - Bold feminine fragrance
5. **Reflections Moonlit Kiss Eau de Toilette** - R250.00 - Romantic feminine fragrance

## Tech Stack
- **Frontend**: React with TypeScript, TanStack Query, Wouter router
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with custom theme colors

## Project Structure
```
client/src/
├── components/       # Reusable UI components
│   ├── header.tsx   # Store header with logo, nav, and cart
│   ├── hero.tsx     # Hero section banner
│   ├── product-card.tsx  # Product display cards with scratch prices
│   ├── cart-sheet.tsx    # Shopping cart drawer
│   └── photo-carousel.tsx # Rotating image carousel
├── lib/
│   └── cart-context.tsx  # Cart state management
├── pages/
│   ├── home.tsx     # Main landing page
│   ├── shop.tsx     # Product catalog page
│   ├── about.tsx    # About us page
│   └── contact.tsx  # Contact form page
└── App.tsx          # App entry point with routes

server/
├── db.ts            # Database connection
├── routes.ts        # API endpoints
├── storage.ts       # Data access layer
├── seed.ts          # Initial product data
└── index.ts         # Server entry point

netlify/functions/   # Serverless functions for Netlify
├── products.ts      # GET /api/products
└── cart.ts          # Cart operations

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
- **Primary**: Dark navy blue (#1F4D88)
- **Secondary**: Orange (#F5A623)
- **Accent**: Charcoal (#2B2E34)

## Deployment
Configured for Netlify deployment with:
- Serverless functions in `/netlify/functions`
- Static files served from `/dist`
- See `NETLIFY_SETUP.md` for deployment instructions

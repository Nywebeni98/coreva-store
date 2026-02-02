# Vercel Deployment Setup

## Steps to Deploy to Vercel

### 1. Push to GitHub
Push this project to a GitHub repository.

### 2. Import to Vercel
- Go to [vercel.com](https://vercel.com)
- Click "Add New" > "Project"
- Import your GitHub repository

### 3. Set Environment Variables
In Vercel project settings, add these environment variables:
- `DATABASE_URL` - Your PostgreSQL connection string (from Neon, Supabase, or another provider)

### 4. Database Setup
You'll need a PostgreSQL database. Recommended providers:
- **Neon** (neon.tech) - Free tier available
- **Supabase** (supabase.com) - Free tier available
- **PlanetScale** - MySQL alternative

After getting your DATABASE_URL, run the database migration:
```bash
npx drizzle-kit push
```

### 5. Deploy
Vercel will automatically deploy when you push to GitHub.

## Project Structure for Vercel

```
/api                 # Serverless API functions
  /products.ts       # GET /api/products
  /cart.ts           # GET/POST/DELETE /api/cart
  /cart/[id].ts      # PATCH/DELETE /api/cart/:id
/client              # React frontend (Vite)
/server              # Database connection
/shared              # Shared types/schemas
vercel.json          # Vercel configuration
```

## Important Notes

1. The `/api` folder contains serverless functions that replace the Express routes
2. Static assets (images) in `attached_assets/` will be served from `/assets/`
3. Make sure your database allows connections from Vercel's IP addresses

## Local Development

Continue using `npm run dev` for local development with the Express server.

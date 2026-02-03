# Netlify Deployment Setup

## Steps to Deploy to Netlify

### 1. Push to GitHub
Push this project to a GitHub repository (already done if you followed the Vercel setup).

### 2. Import to Netlify
- Go to [netlify.com](https://netlify.com)
- Click "Add new site" > "Import an existing project"
- Connect your GitHub account
- Select your `coreva-store` repository

### 3. Configure Build Settings
Netlify should auto-detect the settings from `netlify.toml`, but verify:
- **Build command**: `npm install && cd client && npm install && npx vite build --outDir ../dist`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

### 4. Set Environment Variables
In Netlify site settings > Environment variables, add:
- `DATABASE_URL` - Your PostgreSQL connection string

### 5. Deploy
Click "Deploy site" and Netlify will build and deploy your app!

## Project Structure for Netlify

```
/netlify/functions     # Serverless API functions
  /products.ts         # GET /api/products
  /cart.ts             # GET/POST/DELETE /api/cart
/client                # React frontend (Vite)
/server                # Database connection (for local dev)
/shared                # Shared types/schemas
netlify.toml           # Netlify configuration
```

## Important Notes

1. The `/netlify/functions` folder contains serverless functions that handle API requests
2. Static assets are served from the `dist` folder after build
3. All routes are redirected to `index.html` for client-side routing
4. Make sure your database allows connections from Netlify's IP addresses

## Local Development

Continue using `npm run dev` for local development with the Express server.

## Database Setup

You'll need a PostgreSQL database. Recommended providers:
- **Neon** (neon.tech) - Free tier available
- **Supabase** (supabase.com) - Free tier available
- **Railway** (railway.app) - Easy PostgreSQL hosting

After getting your DATABASE_URL, run:
```bash
npx drizzle-kit push
```

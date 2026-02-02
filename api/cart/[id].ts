import type { VercelRequest, VercelResponse } from '@vercel/node';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { id } = req.query;
  
  if (typeof id !== 'string') {
    return res.status(400).json({ error: "Invalid ID" });
  }
  
  if (req.method === 'PATCH') {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
      }
      
      const result = await pool.query(
        'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
        [quantity, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error updating cart item:", error);
      return res.status(500).json({ error: "Failed to update cart item" });
    }
  }
  
  if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM cart_items WHERE id = $1', [id]);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error removing from cart:", error);
      return res.status(500).json({ error: "Failed to remove from cart" });
    }
  }
  
  return res.status(405).json({ error: "Method not allowed" });
}

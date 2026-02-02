import type { VercelRequest, VercelResponse } from '@vercel/node';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    try {
      const sessionId = req.query.sessionId as string;
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID required" });
      }
      
      const result = await pool.query(`
        SELECT ci.*, 
          json_build_object(
            'id', p.id,
            'name', p.name,
            'description', p.description,
            'price', p.price,
            'image', p.image,
            'category', p.category,
            'gender', p.gender
          ) as product
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.session_id = $1
      `, [sessionId]);
      
      const items = result.rows.map(row => ({
        id: row.id,
        sessionId: row.session_id,
        productId: row.product_id,
        quantity: row.quantity,
        product: row.product,
      }));
      
      return res.status(200).json(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      return res.status(500).json({ error: "Failed to fetch cart" });
    }
  }
  
  if (req.method === 'POST') {
    try {
      const { sessionId, productId, quantity = 1 } = req.body;
      
      // Check if item already exists
      const existing = await pool.query(
        'SELECT * FROM cart_items WHERE session_id = $1 AND product_id = $2',
        [sessionId, productId]
      );
      
      if (existing.rows.length > 0) {
        const newQty = existing.rows[0].quantity + quantity;
        const updated = await pool.query(
          'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *',
          [newQty, existing.rows[0].id]
        );
        return res.status(200).json(updated.rows[0]);
      }
      
      const result = await pool.query(
        'INSERT INTO cart_items (session_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [sessionId, productId, quantity]
      );
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({ error: "Failed to add to cart" });
    }
  }
  
  if (req.method === 'DELETE') {
    try {
      const sessionId = req.query.sessionId as string;
      if (sessionId) {
        await pool.query('DELETE FROM cart_items WHERE session_id = $1', [sessionId]);
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ error: "Session ID required" });
    } catch (error) {
      console.error("Error clearing cart:", error);
      return res.status(500).json({ error: "Failed to clear cart" });
    }
  }
  
  return res.status(405).json({ error: "Method not allowed" });
}

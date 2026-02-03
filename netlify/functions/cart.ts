import type { Handler } from "@netlify/functions";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const handler: Handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod === "GET") {
    try {
      const sessionId = event.queryStringParameters?.sessionId;
      if (!sessionId) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Session ID required" }),
        };
      }

      const result = await pool.query(
        `SELECT ci.*, 
          json_build_object(
            'id', p.id,
            'name', p.name,
            'description', p.description,
            'price', p.price,
            'scratchPrice', p.scratch_price,
            'image', p.image,
            'category', p.category,
            'gender', p.gender
          ) as product
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.session_id = $1`,
        [sessionId]
      );

      const items = result.rows.map((row) => ({
        id: row.id,
        sessionId: row.session_id,
        productId: row.product_id,
        quantity: row.quantity,
        product: row.product,
      }));

      return { statusCode: 200, headers, body: JSON.stringify(items) };
    } catch (error) {
      console.error("Error fetching cart:", error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to fetch cart" }),
      };
    }
  }

  if (event.httpMethod === "POST") {
    try {
      const { sessionId, productId, quantity = 1 } = JSON.parse(event.body || "{}");

      const existing = await pool.query(
        "SELECT * FROM cart_items WHERE session_id = $1 AND product_id = $2",
        [sessionId, productId]
      );

      if (existing.rows.length > 0) {
        const newQty = existing.rows[0].quantity + quantity;
        const updated = await pool.query(
          "UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *",
          [newQty, existing.rows[0].id]
        );
        return { statusCode: 200, headers, body: JSON.stringify(updated.rows[0]) };
      }

      const result = await pool.query(
        "INSERT INTO cart_items (session_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [sessionId, productId, quantity]
      );
      return { statusCode: 200, headers, body: JSON.stringify(result.rows[0]) };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to add to cart" }),
      };
    }
  }

  if (event.httpMethod === "DELETE") {
    try {
      const sessionId = event.queryStringParameters?.sessionId;
      if (sessionId) {
        await pool.query("DELETE FROM cart_items WHERE session_id = $1", [sessionId]);
        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
      }
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Session ID required" }),
      };
    } catch (error) {
      console.error("Error clearing cart:", error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Failed to clear cart" }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};

import express from "express";
import pool from "./db.js";

const router = express.Router();

// GET /api/todos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/todos
router.post("/", async (req, res) => {
  console.log("it running here in post: ", req.body);
  const { text } = req.body;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Text is required" });
  }
  
  try {
    const result = await pool.query(
      "INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING *",
      [text, false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/todos/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  
  try {
    let query = "UPDATE todos SET ";
    let values = [];
    let paramCount = 1;
    
    if (typeof text === "string") {
      query += `text = $${paramCount}`;
      values.push(text);
      paramCount++;
    }
    
    if (typeof completed === "boolean") {
      if (values.length > 0) query += ", ";
      query += `completed = $${paramCount}`;
      values.push(completed);
      paramCount++;
    }
    
    if (values.length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }
    
    query += ` WHERE id = $${paramCount} RETURNING *`;
    values.push(id);
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/todos/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router; 
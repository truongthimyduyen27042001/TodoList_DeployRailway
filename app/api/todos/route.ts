import { db } from "./db";
import "./initDb"; // Auto-initialize database

export const GET = async () => {
  try {
    const todos = await db.query("SELECT * FROM todos ORDER BY created_at DESC");
    console.log("todos: ", todos)
    return Response.json(todos.rows);
  } catch (error) {
    console.log("error: ", error)
    return Response.json({ error: "Failed to get todos" }, { status: 500 });
  }
}

export const POST = async (request: Request) => {
  try {
    const { text } = await request.json();
    const todo = await db.query("INSERT INTO todos (text) VALUES ($1) RETURNING *", [text]);
    if (todo.rowCount === 0) {
      return Response.json({ error: "Failed to create todo" }, { status: 500 });
    }
    return Response.json({data: todo.rows[0], message: "Todo created successfully"}, { status: 201 });
  } catch (error) {
    console.error("Create todo error:", error);
    return Response.json({ error: "Failed to create todo" }, { status: 500 });
  }
}

export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();
    const result = await db.query("DELETE FROM todos WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return Response.json({ error: "Todo not found" }, { status: 404 });
    }
    return Response.json({ message: "Todo deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete todo error:", error);
    return Response.json({ error: "Failed to delete todo" }, { status: 500 });
  }
}

export const PUT = async (request: Request) => {
  try {
    const { id, text } = await request.json();
    const result = await db.query("UPDATE todos SET text = $1 WHERE id = $2 RETURNING *", [text, id]);
    if (result.rowCount === 0) {
      return Response.json({ error: "Todo not found" }, { status: 404 });
    }
    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("Update todo error:", error);
    return Response.json({ error: "Failed to update todo" }, { status: 500 });
  }
}
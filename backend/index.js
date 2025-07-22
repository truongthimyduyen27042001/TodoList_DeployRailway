import express from "express";
import cors from "cors";
import todosRouter from "./todos.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/todos", todosRouter);

app.get("/", (req, res) => {
  res.send("TodoList Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 
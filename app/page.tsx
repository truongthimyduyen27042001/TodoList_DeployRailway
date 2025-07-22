import TodoList from "./components/TodoList";
import { getTodos } from "./utils/api";

export default async function HomePage() {
  const todos = await getTodos();
  return <TodoList initialTodos={todos} />;
}

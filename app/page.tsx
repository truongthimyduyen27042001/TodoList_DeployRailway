import TodoList from "./components/TodoList";
import { getTodos } from "./utils/api";

export default async function HomePage() {
  const todos = await getTodos();
  console.log("todos: ", todos)
  return <TodoList initialTodos={todos} />;
  // return <div>Hello World</div>;
}

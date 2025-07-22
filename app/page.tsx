import TodoList from "./components/TodoList";

export default function HomePage() {
  // Load todos client-side to avoid build-time database connection
  return <TodoList initialTodos={[]} />;
}

"use client";

import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import styles from "@/styles/TodoList.module.css";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../utils/api";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [currentTodo, setCurrentTodo] = useState<Todo | undefined>();

  const handleAdd = async (text: string) => {
    const newTodo = await addTodo(text);
    setTodos((prev) => [...prev, newTodo.data]);
  };

  const handleToggle = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleEdit = async (id: number) => {
    const todo = todos.find(todo => todo.id === id);
    setCurrentTodo(todo);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTodo && currentTodo.text.trim()) {
      console.log("currentTodo: ", currentTodo);
      const todo = await updateTodo(currentTodo.id, currentTodo.text.trim());
      setTodos(prev => prev.map(t => t.id === todo.id ? todo : t));
      setCurrentTodo(undefined);
    }
  };

  const handleEditClose = () => {
    setCurrentTodo(undefined);
  };

  // Load todos on component mount
  useEffect(() => {
    getTodos().then(data => {
      console.log("data: ", data);
      setTodos(data);
    }).catch(error => {
      console.error("Failed to load todos:", error);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Todo List</h2>
      <TodoForm onAdd={handleAdd} />
      <ul className={styles.list}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>
      {currentTodo && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <form onSubmit={handleEditSubmit} className={styles.modalForm}>
              <h3>Cập nhật công việc</h3>
              <input
                type="text"
                value={currentTodo.text}
                onChange={e => setCurrentTodo({ ...currentTodo, text: e.target.value })}
                className={styles.modalInput}
                autoFocus
              />
              <div className={styles.modalActions}>
                <button type="submit" className={styles.editButton}>Lưu</button>
                <button type="button" onClick={handleEditClose} className={styles.deleteButton}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

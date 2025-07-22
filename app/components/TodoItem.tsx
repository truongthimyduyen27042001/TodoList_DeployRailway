"use client";

import React from "react";

import styles from "../styles/TodoList.module.css";

type TodoItemProps = {
  todo: { id: number; text: string; completed: boolean };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  return (
    <li className={styles.todoItem}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className={styles.checkbox}
      />
      <span
        className={styles.todoText + (todo.completed ? " " + styles.completed : "")}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onEdit(todo.id)}
        className={styles.editButton}
      >
        Cập nhật
      </button>
      <button
        onClick={() => onDelete(todo.id)}
        className={styles.deleteButton}
      >
        Xóa
      </button>
    </li>
  );
}

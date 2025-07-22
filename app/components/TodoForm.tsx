"use client";

import React, { useState } from "react";
import styles from "../styles/TodoForm.module.css";

type TodoFormProps = {
  onAdd: (text: string) => void;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Nhập công việc..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Thêm</button>
    </form>
  );
}

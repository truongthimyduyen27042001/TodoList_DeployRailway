const API_URL = "http://localhost:4000/api/todos";

export const getTodos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addTodo = async (text: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};


export const deleteTodo = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const updateTodo = async (id: number, text: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const API_URL = "/api/todos";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};

export const getTodos = async () => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}${API_URL}`);
  return response.json();
};

export const addTodo = async (text: string) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}${API_URL}`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};


export const deleteTodo = async (id: number) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}${API_URL}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const updateTodo = async (id: number, text: string) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}${API_URL}`, {
    method: "PUT",
    body: JSON.stringify({ id, text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

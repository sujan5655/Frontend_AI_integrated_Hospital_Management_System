const API_URL = "http://localhost:8000/api";

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.message || "Login failed");
  }

  return data;
};

export const sendAIMessage = async (message: string) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const response = await fetch(`${API_URL}/ai/chat/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      message,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || data.error || "AI request failed");
  }

  return data;
};

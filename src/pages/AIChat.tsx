import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendAIMessage } from "../services/api";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AIChat() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hello! How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = message.trim();

    if (!text || loading) {
      return;
    }

    // Add user message
    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: text,
      },
    ]);

    setMessage("");

    try {
      setLoading(true);

      const data = await sendAIMessage(text);

      setMessages((previous) => [
        ...previous,
        {
          role: "ai",
          content: data.response,
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";

      setMessages((previous) => [
        ...previous,
        {
          role: "ai",
          content: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");

    localStorage.removeItem("refresh_token");

    navigate("/login");
  };

  return (
    <div className="chat-page">
      {/* Header */}

      <header className="chat-header">
        <div>
          <h1>Hospital AI Assistant</h1>
          <h2>Chat with the hospital bot</h2>

          <span>Online</span>
        </div>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </header>

      {/* Chat */}

      <main className="chat-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user"
                ? "message-row user-row"
                : "message-row ai-row"
            }
          >
            <div
              className={
                msg.role === "user"
                  ? "message user-message"
                  : "message ai-message"
              }
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row ai-row">
            <div className="message ai-message">AI is thinking...</div>
          </div>
        )}
      </main>

      {/* Input */}

      <div className="input-container">
        <input
          type="text"
          placeholder="Ask the hospital AI..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <button onClick={sendMessage} disabled={loading || !message.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

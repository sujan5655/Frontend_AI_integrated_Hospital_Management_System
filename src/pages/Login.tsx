import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/auth/authThunk";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const result = await dispatch(
        login({
          email,
          password,
        }),
      ).unwrap();

      switch (result.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;

        case "doctor":
          navigate("/doctor/dashboard");
          break;

        case "patient":
          navigate("/patient/dashboard");
          break;

        case "staff":
          navigate("/staff/dashboard");
          break;

        default:
          navigate("/login");
      }
    } catch (error) {
      setError(typeof error === "string" ? error : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Hospital Management</h1>

        <h2>Login</h2>

        {error && <div className="error">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

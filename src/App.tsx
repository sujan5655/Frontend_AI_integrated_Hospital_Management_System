import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AIChat from "./pages/AIChat";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}

        <Route path="/" element={<Navigate to="/ai-chat" replace />} />

        {/* Login */}

        <Route path="/login" element={<Login />} />

        {/* Protected pages */}

        <Route element={<ProtectedRoute />}>
          <Route path="/ai-chat" element={<AIChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

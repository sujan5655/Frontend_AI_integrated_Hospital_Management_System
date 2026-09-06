import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type Role = "admin" | "doctor" | "patient";

interface JwtPayload {
  user_id: number;
  email: string;
  role: Role;
  exp: number;
  iat: number;
  token_type: string;
}

export default function DashboardRedirect() {
  const token = localStorage.getItem("access");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let destination: string | null = null;

  try {
    const user = jwtDecode<JwtPayload>(token);

    if (user.exp * 1000 < Date.now()) {
      throw new Error("Token expired");
    }

    switch (user.role) {
      case "admin":
        destination = "/admin/dashboard";
        break;

      case "doctor":
        destination = "/doctor/dashboard";
        break;

      case "patient":
        destination = "/patient/dashboard";
        break;

      default:
        destination = null;
    }
  } catch {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }

  if (!destination) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={destination} replace />;
}

import { jwtDecode } from "jwt-decode";

export type Role = "admin" | "doctor" | "patient" | "staff";

export interface JwtPayload {
  user_id: number;
  email: string;
  role: Role;
  exp: number;
  iat: number;
  token_type: string;
}

export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

export function getCurrentUser(): JwtPayload | null {
  const token = getAccessToken();

  if (!token) {
    return null;
  }

  try {
    const user = jwtDecode<JwtPayload>(token);

    if (user.exp * 1000 < Date.now()) {
      logout();
      return null;
    }

    return user;
  } catch {
    logout();
    return null;
  }
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

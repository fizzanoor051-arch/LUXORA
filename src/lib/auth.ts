export interface StoredUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("luxora_token");
}

export function getUser(): StoredUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const user = localStorage.getItem("luxora_user");

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function setAuth(
  user: StoredUser,
  token: string
) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    "luxora_user",
    JSON.stringify(user)
  );

  localStorage.setItem("luxora_token", token);
}

export function clearAuth() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("luxora_user");
  localStorage.removeItem("luxora_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function isAdmin(): boolean {
  const user = getUser();

  return user?.role === "admin";
}
import { api } from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export const authService = {
  async login(
    data: LoginData
  ): Promise<AuthResponse> {
    return api.post<AuthResponse>(
      "/auth/login",
      data
    );
  },

  async register(
    data: RegisterData
  ): Promise<AuthResponse> {
    return api.post<AuthResponse>(
      "/auth/register",
      data
    );
  },

  async getProfile(): Promise<AuthUser> {
    return api.get<AuthUser>("/auth/profile");
  },

  async forgotPassword(
    email: string
  ): Promise<{ message: string }> {
    return api.post<{ message: string }>(
      "/auth/forgot-password",
      { email }
    );
  },

  async resetPassword(
    token: string,
    password: string
  ): Promise<{ message: string }> {
    return api.post<{ message: string }>(
      "/auth/reset-password",
      {
        token,
        password,
      }
    );
  },

  async logout(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem("luxora_token");
      localStorage.removeItem("luxora_user");
    }
  },
};
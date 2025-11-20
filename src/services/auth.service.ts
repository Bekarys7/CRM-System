import axios from "axios";
import { api, BASE_URL } from "../api/axios";
import type {
  UserRegistration,
  AuthData,
  Token,
  Profile,
} from "../types/Auth.types";

class AuthService {
  #accessToken: null | string = null;

  async login(authData: AuthData): Promise<void> {
    const response = await api.post<Token>("/auth/signin", authData);
    this.#accessToken = response.data.accessToken;
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }

  async logout(): Promise<void> {
    try {
      await api.post<string>("/user/logout");
    } finally {
      localStorage.removeItem("refreshToken");
      this.#accessToken = null;
    }
  }

  async registerUser(obj: UserRegistration): Promise<void> {
    await api.post<Profile>("/auth/signup", obj);
  }

  async checkAuth(): Promise<void> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return;
    }
    try {
      const response = await axios.post<Token>(`${BASE_URL}/auth/refresh`, {
        refreshToken: refreshToken,
      });
      this.#accessToken = response.data.accessToken;
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch (error) {
      this.#accessToken = null;
      localStorage.removeItem("refreshToken");
      throw error;
    }
  }

  get accessToken() {
    return this.#accessToken;
  }
}

export const authService = new AuthService();

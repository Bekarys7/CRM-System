import { api } from "../api/axios";
import type {
  UserRegistration,
  AuthData,
  Token,
  Profile,
} from "../types/Auth.types";

export default class AuthService {
  static async registerNewUser(obj: UserRegistration): Promise<Profile> {
    const response = await api.post<Profile>("/auth/signup", obj);
    console.log(response);
    return response.data;
  }

  static async login(authData: AuthData): Promise<Token> {
    const response = await api.post<Token>("/auth/signin", authData);
    console.log(response.data);
    return response.data;
  }

  static async logout(): Promise<string> {
    const response = await api.post<string>("/user/logout");
    console.log(response.data);
    return response.data;
  }
}

export class Auth2Service {
  #accessToken: null | string = null;

  async login(authData: AuthData) {
    const response = await api.post<Token>("/auth/signin", authData);
    this.#accessToken = response.data.accessToken;
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }

  get token() {
    return this.#accessToken;
  }

  async logout(): Promise<void> {
    try {
      await api.post<string>("/user/logout");
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("refreshToken");
      this.#accessToken = null;
    }
  }

  async registerNewUser(obj: UserRegistration): Promise<void> {
    try {
      await api.post<Profile>("/auth/signup", obj);
    } catch (error) {
      console.log(error);
    }
  }
}

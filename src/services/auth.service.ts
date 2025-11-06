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

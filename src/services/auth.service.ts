import { api } from "../api/axios";
import type {
  UserRegistration,
  AuthData,
  Token,
  Profile,
} from "../types/Auth.types";

export async function registerNewUser(obj: UserRegistration): Promise<Profile> {
  const response = await api.post<Profile>("/auth/signup", obj);
  console.log(response);
  return response.data;
}

export async function login(authData: AuthData): Promise<Token> {
  const response = await api.post("/auth/signin", authData);
  return response.data;
}

export async function logout(authData: AuthData): Promise<string> {
  const response = await api.post<string>("/auth/signin", authData);
  return response.data;
}

import { api } from "./axios";
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

export async function AuthenticateUser(authData: AuthData): Promise<Token> {
  const response = await api.post("/auth/signin", authData);
  return response.data;
}

export async function getUserData(token: string | undefined): Promise<Profile> {
  const response = await api.get<Profile>("/user/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

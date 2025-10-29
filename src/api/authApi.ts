import { api } from "./axios";
import {} from "axios";
import type { UserRegistration, AuthData } from "../types/Auth.types";

export async function registerNewUser(
  obj: UserRegistration
): Promise<UserRegistration> {
  const response = await api.post<UserRegistration>("/auth/signup", obj);
  return response.data;
}

export async function AuthenticateUser(authData: AuthData): Promise<AuthData> {
  const response = await api.post<AuthData>("/auth/signin", authData);
  return response.data;
}

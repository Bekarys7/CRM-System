import { api } from "./axios";
import {} from "axios";
import type { AuthSignUp, AuthData } from "../types/Auth.types";

export async function registerNewUser(obj: AuthSignUp): Promise<AuthSignUp> {
  const response = await api.post<AuthSignUp>("/auth/signup", obj);
  return response.data;
}

export async function AuthenticateUser(authData: AuthData): Promise<AuthData> {
  const response = await api.post<AuthData>("/auth/signin", authData);
  return response.data;
}

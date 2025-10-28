import { api } from "./axios";
import type { AuthSignUp } from "../types/Auth.types";

export async function registerNewUser(obj: AuthSignUp): Promise<AuthSignUp> {
  const response = await api.post<AuthSignUp>("/auth/signup", obj);
  return response.data;
}

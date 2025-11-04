import { api } from "../api/axios";
import type { Profile } from "../types/Auth.types";

export async function getUserData(): Promise<Profile> {
  const response = await api.get<Profile>("/user/profile", {});
  return response.data;
}

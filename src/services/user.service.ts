import { api } from "../api/axios";
import type { Profile } from "../types/Auth.types";

export default class UserService {
  static async getUserData(): Promise<Profile> {
    const response = await api.get<Profile>("/user/profile");
    return response.data;
  }
}

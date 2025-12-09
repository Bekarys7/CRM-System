import { api } from "../api/axios";
import type { Profile } from "../types/Auth.types";
import type { MetaResponse, User } from "../types/Users.types";

export default class UserService {
  static async getUserData(): Promise<Profile> {
    const response = await api.get<Profile>("/user/profile");
    return response.data;
  }
  static async getUsersData(): Promise<MetaResponse<User>> {
    const response = await api.get<MetaResponse<User>>("/admin/users");
    return response.data;
  }
}

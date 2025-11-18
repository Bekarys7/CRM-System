import { api } from "../api/axios";
import type {
  PasswordRequest,
  Profile,
  ProfileRequest,
} from "../types/Auth.types";

export default class UserService {
  static async getUserData(): Promise<Profile> {
    const response = await api.get<Profile>("/user/profile", {});
    return response.data;
  }
  static async updateUserData(data: ProfileRequest): Promise<Profile> {
    const response = await api.put<Profile>("/user/profile", data);
    return response.data;
  }

  static async updateUserPassword(data: PasswordRequest): Promise<string> {
    const response = await api.put<string>("/user/profile", data);
    return response.data;
  }
}

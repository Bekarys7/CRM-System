import { api } from "../api/axios";
import type { Profile } from "../types/Auth.types";
import type {
  MetaResponse,
  User,
  UserFilters,
  UserRequest,
  UserRolesRequest,
} from "../types/Users.types";

export default class UserService {
  static async getUserData(): Promise<Profile> {
    const response = await api.get<Profile>("/user/profile");
    return response.data;
  }
  static async getUsersData(
    UserFilters?: UserFilters,
  ): Promise<MetaResponse<User>> {
    const response = await api.get<MetaResponse<User>>("/admin/users", {
      params: UserFilters,
    });
    return response.data;
  }
  static async getUserById(userId: number): Promise<User> {
    const response = await api.get<User>(`/admin/users/${userId}`);
    return response.data;
  }
  static async editUser(userId: number, payload: UserRequest): Promise<User> {
    const { data } = await api.put<User>(`/admin/users/${userId}`, payload);
    return data;
  }

  static async blockUser(userId: number): Promise<void> {
    const { data } = await api.post<void>(`/admin/users/${userId}/block`);
    return data;
  }
  static async unblockUser(userId: number): Promise<void> {
    const { data } = await api.post<void>(`/admin/users/${userId}/unblock`);
    return data;
  }

  static async deleteUser(userId: number): Promise<void> {
    const { data } = await api.delete<void>(`/admin/users/${userId}`);
    return data;
  }
  static async updateUsersRights(
    userId: number,
    roles: UserRolesRequest,
  ): Promise<User> {
    const { data } = await api.post<User>(
      `/admin/users/${userId}/right`,
      roles,
    );
    return data;
  }
}

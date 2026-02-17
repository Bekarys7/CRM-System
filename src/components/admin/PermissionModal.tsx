import React, { useEffect, useState } from "react";
import { Modal, Checkbox, notification } from "antd";
import type { Role, User, UserRolesRequest } from "../../types/Users.types";
import type { GetProp } from "antd";
import UserService from "../../services/user.service";
import { AxiosError } from "axios";

interface PermissionsModalProps {
  open: boolean;
  onCancel: () => void;
  user: User | undefined;
  onRefresh: () => void;
}

export const PermissionsModal: React.FC<PermissionsModalProps> = ({
  open,
  onCancel,
  user,
  onRefresh,
}) => {
  const [checkedList, setCheckedList] = useState<Role[]>([]);
  const roleOptions = ["ADMIN", "MODERATOR", "USER"];

  useEffect(() => {
    if (user && user.roles) {
      setCheckedList(user.roles);
    } else {
      setCheckedList([]);
    }
  }, [user]);

  const handleRolesChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues,
  ) => {
    setCheckedList(checkedValues as Role[]);
  };

  const handleSave = async (id: number) => {
    const payload: UserRolesRequest = {
      roles: checkedList,
    };
    try {
      await UserService.updateUsersRights(id, payload);
      onRefresh();
      onCancel();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        notification.error({
          message: `${error?.message || "Failed to update permissions"}`,
          description: `${error?.response?.data || "An error occurred while updating permissions."}`,
        });
      }
    }
  };

  return (
    <Modal
      title={`Permissions for: ${user?.username || "..."}`}
      open={open}
      onCancel={onCancel}
      onOk={() => {
        if (user) {
          handleSave(user?.id);
        }
      }}
    >
      {user && (
        <div>
          <Checkbox.Group
            options={roleOptions}
            value={checkedList}
            onChange={handleRolesChange}
          />
        </div>
      )}
    </Modal>
  );
};

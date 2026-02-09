import React, { useEffect, useState } from "react";
import { Modal, Checkbox } from "antd";
import type { Role, User, UserRolesRequest } from "../../types/Users.types";
import type { GetProp } from "antd";
import UserService from "../../services/user.service";

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
  }, [user?.roles]);

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
    } catch {
      //error handling can be added here, e.g. show notification
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
          >
            ADMIN
          </Checkbox.Group>
        </div>
      )}
    </Modal>
  );
};

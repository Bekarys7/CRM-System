import React, { useState } from "react";
import { Button, Input, Modal, Radio, type RadioChangeEvent } from "antd";
import type { UserFilters as IUserFilters } from "../../types/Users.types";
type FilterProps = {
  setFilters: React.Dispatch<React.SetStateAction<IUserFilters>>;
};
type FilterType = "all" | "blocked" | "notBlocked";

const UserFilters: React.FC<FilterProps> = ({ setFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [value, setValue] = useState<FilterType>("all");

  const onSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      page: 0,
      search: value,
    }));
  };

  const handleStatusChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleApplyStatusFilter = () => {
    setIsModalOpen(false);
    setFilters((prev) => ({
      ...prev,
      isBlocked:
        value === "blocked" ? true : value === "notBlocked" ? false : undefined,
    }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Input.Search placeholder="Search by name or email" onSearch={onSearch} />
      <Button
        type="primary"
        onClick={handleOpenModal}
        style={{ width: "5%", marginTop: "0.5rem" }}
      >
        Filter
      </Button>
      <Modal
        title="Filter users by block status"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleApplyStatusFilter}
        onCancel={handleCancel}
      >
        <Radio.Group
          onChange={handleStatusChange}
          value={value}
          options={[
            { value: "all", label: "All users" },
            { value: "blocked", label: "Blocked" },
            { value: "notBlocked", label: "Not blocked" },
          ]}
        />
      </Modal>
    </>
  );
};

export default UserFilters;

import React, { useState } from "react";
import { Button, Input, Modal, Radio, type RadioChangeEvent } from "antd";
import type { UserFilters } from "../../types/Users.types";
type FilterProps = {
  setFilters: React.Dispatch<React.SetStateAction<UserFilters>>;
};

const Filter: React.FC<FilterProps> = ({ setFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);

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

  const handleOk = () => {
    setIsModalOpen(false);
    setFilters((prev) => ({
      ...prev,
      isBlocked: value === 2 ? true : value === 3 ? false : undefined,
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
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Radio.Group
          onChange={handleStatusChange}
          value={value}
          options={[
            { value: 1, label: "All users" },
            { value: 2, label: "Blocked" },
            { value: 3, label: "Not blocked" },
          ]}
        />
      </Modal>
    </>
  );
};

export default Filter;

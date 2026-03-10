import React, { useState } from "react";
import { Input, Radio, type RadioChangeEvent } from "antd";
import type { UserFilters as IUserFilters } from "../../types/Users.types";
type FilterProps = {
  setFilters: React.Dispatch<React.SetStateAction<IUserFilters>>;
};
type FilterType = "all" | "blocked" | "notBlocked";

const UserFilters: React.FC<FilterProps> = ({ setFilters }) => {
  const [value, setValue] = useState<FilterType>("all");

  const onSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      page: 0,
      search: value,
    }));
  };

  const handleApplyStatusFilter = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setValue(e.target.value);
    setFilters((prev) => ({
      ...prev,
      isBlocked:
        value === "blocked" ? true : value === "notBlocked" ? false : undefined,
    }));
  };

  return (
    <>
      <Input.Search placeholder="Search by name or email" onSearch={onSearch} />
      <Radio.Group
        onChange={handleApplyStatusFilter}
        value={value}
        options={[
          { value: "all", label: "All users" },
          { value: "blocked", label: "Blocked" },
          { value: "notBlocked", label: "Not blocked" },
        ]}
      />
    </>
  );
};

export default UserFilters;

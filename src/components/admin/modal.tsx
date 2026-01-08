import React, { useState } from "react";
import { Button, Modal, Radio, type RadioChangeEvent } from "antd";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Radio.Group
          onChange={onChange}
          value={value}
          options={["Option A", "Option B", "Option C"]}
        />
      </Modal>
    </>
  );
};

export default App;

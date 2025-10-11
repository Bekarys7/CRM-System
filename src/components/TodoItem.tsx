import React, { useState, type FC } from "react";
import styles from "../components/TodoItem.module.scss";

import { deleteTodos, editTodos } from "../api/http";
import type { Todo, UpdateTodos } from "../types/Todo.types";
import { Button, Form, Input } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

type TodoItemProps = {
  todo: Todo;
  updateTodos: UpdateTodos;
};

const TodoItem: FC<TodoItemProps> = ({ todo, updateTodos }) => {
  const [form] = Form.useForm();

  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await deleteTodos(todo.id!);
    updateTodos();
  };

  const handleCheckbox = async () => {
    await editTodos(todo.id!, { isDone: !todo.isDone });
    updateTodos();
  };

  const handleEdit = () => {
    form.setFieldsValue({ title: todo.title.trim() });
    setIsEditing(true);
  };

  const handleCancel = () => setIsEditing(false);

  const handleSubmit = async (values: { title: string }) => {
    const title = values.title.trim();
    if (!title) return;
    await editTodos(todo.id!, { title });
    await updateTodos();
    setIsEditing(false);
  };

  console.log("pererender");
  return (
    <div>
      {isEditing ? (
        <Form form={form} className={styles.control} onFinish={handleSubmit}>
          <Form.Item
            validateTrigger="onSubmit"
            name="title"
            rules={[
              { required: true, message: "Please input your task!" },
              { min: 2, message: "Minimum of 2 characters" },
              { max: 64, message: "Maximum of 64 characters" },
            ]}
          >
            <Input placeholder="Edit task" className={styles.inputEdit} />
          </Form.Item>

          <div className={styles.buttonControl}>
            <Button
              color="green"
              variant="solid"
              icon={<CheckOutlined />}
              htmlType="submit"
            />
            <Button
              type="primary"
              danger
              icon={<CloseOutlined />}
              onClick={handleCancel}
            />
          </div>
        </Form>
      ) : (
        <div className={styles.control}>
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={handleCheckbox}
          />
          <p
            className={`${styles.titleWrapper} ${
              todo.isDone ? styles.completed : ""
            }`}
          >
            {todo.title}
          </p>
          <div className={styles.buttonControl}>
            <Button
              type="primary"
              onClick={handleDelete}
              danger
              icon={<DeleteOutlined />}
            ></Button>
            <Button
              onClick={handleEdit}
              type="primary"
              icon={<EditOutlined />}
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TodoItem);

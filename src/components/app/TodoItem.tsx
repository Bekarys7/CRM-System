import React, { useState, type FC } from "react";
import styles from "../app/TodoItem.module.scss";
import { App } from "antd";
import { deleteTodos, editTodos } from "../../services/todo.service";
import type { Todo, UpdateTodos } from "../../types/Todo.types";
import type { CheckboxProps } from "antd";
import { Button, Form, Input, Checkbox, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { AxiosError } from "axios";

type TodoItemProps = {
  todo: Todo;
  updateTodos: UpdateTodos;
};

type EditFormValues = {
  title: string;
};

const TodoItem: FC<TodoItemProps> = ({ todo, updateTodos }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm<EditFormValues>();

  const { notification } = App.useApp();

  const handleDelete = async () => {
    try {
      await deleteTodos(todo.id!);
      updateTodos();
    } catch (error) {
      if (error instanceof AxiosError) {
        notification.error({
          message: "Delete error",
          description: `You can't delete cause ${error.response?.data}`,
        });
      }
    }
  };

  const handleCheckbox: CheckboxProps["onChange"] = async () => {
    try {
      await editTodos(todo.id!, { isDone: !todo.isDone });
      updateTodos();
    } catch (error) {
      if (error instanceof AxiosError) {
        notification.error({
          message: "error",
          description: `You can't edit cause ${error.response?.data}`,
        });
      }
    }
  };

  const handleEdit = () => {
    form.setFieldsValue({ title: todo.title.trim() });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (values: { title: string }) => {
    try {
      const title = values.title.trim();
      if (!title) {
        return;
      }
      await editTodos(todo.id!, { title });
      await updateTodos();
      setIsEditing(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        notification.error({
          message: "submit error",
          description: `You can't submit cause ${error.response?.data}`,
        });
      }
    }
  };

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
          <Space size="small">
            <Checkbox
              onChange={handleCheckbox}
              checked={todo.isDone}
            ></Checkbox>

            <p
              className={`${styles.titleWrapper} ${
                todo.isDone ? styles.completed : ""
              }`}
            >
              {todo.title}
            </p>
          </Space>
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

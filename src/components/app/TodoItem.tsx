import React, { useCallback, useState, type FC } from "react";
import styles from "../app/TodoItem.module.scss";

import { deleteTodos, editTodos } from "../../api/http";
import type { Todo, UpdateTodos } from "../../types/Todo.types";
import type { CheckboxProps } from "antd";
import { Button, Form, Input, Checkbox, Space } from "antd";
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

type EditFormValues = {
  title: string;
};

const TodoItem: FC<TodoItemProps> = ({ todo, updateTodos }) => {
  const [form] = Form.useForm<EditFormValues>();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleDelete = useCallback(async () => {
    await deleteTodos(todo.id!);
    updateTodos();
  }, [todo.id, updateTodos]);

  const handleCheckbox: CheckboxProps["onChange"] = useCallback(async () => {
    await editTodos(todo.id!, { isDone: !todo.isDone });
    updateTodos();
  }, [todo.id, todo.isDone, updateTodos]);

  const handleEdit = useCallback(() => {
    form.setFieldsValue({ title: todo.title.trim() });
    setIsEditing(true);
  }, [todo.title, form]);

  const handleCancel = useCallback(() => setIsEditing(false), []);

  const handleSubmit = useCallback(
    async (values: { title: string }) => {
      const title = values.title.trim();
      if (!title) return;
      await editTodos(todo.id!, { title });
      await updateTodos();
      setIsEditing(false);
    },
    [todo.id, updateTodos]
  );

  console.log("TodoItem");
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

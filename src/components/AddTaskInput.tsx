import styles from "../components/AddTaskInput.module.scss";
import React from "react";
import { Button, Form, Input } from "antd";
import { addTodo } from "../api/http";

export type UpdateTodos = {
  updateTodos: () => Promise<void>;
};

const AddTaskInput: React.FC<UpdateTodos> = ({ updateTodos }) => {
  const [form] = Form.useForm();

  type TodoFormValues = {
    title: string;
  };

  const onFinish = async (values: TodoFormValues) => {
    const title = values.title.trim();
    try {
      await addTodo({ isDone: false, title });
      await updateTodos();
      form.resetFields();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Unknown error");
      }
    }
  };

  const onReset = (e: React.FocusEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.trim();
    if (cleaned) {
      form.setFieldValue("title", cleaned);
    } else {
      form.resetFields();
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Form
          form={form}
          name="todo"
          onFinish={onFinish}
          autoComplete="off"
          className={styles.wrapper}
        >
          <Form.Item
            validateTrigger="onSubmit"
            name="title"
            label={null}
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 2, message: "Minimum of 2 characters" },
              { max: 64, message: "Maximum of 64 charecters" },
            ]}
          >
            <Input
              onBlur={onReset}
              placeholder="Input your task"
              className={styles.taskInput}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.addTaskButton}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddTaskInput;

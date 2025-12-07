import styles from "../app/TodoInput.module.scss";
import React, { memo } from "react";
import { Button, Form, Input } from "antd";
import { addTodo } from "../../services/todo.service";

export type UpdateTodos = {
  updateTodos: () => Promise<void>;
};

type TodoFormValues = {
  title: string;
};

const AddTaskInput: React.FC<UpdateTodos> = ({ updateTodos }) => {
  const [form] = Form.useForm<TodoFormValues>();

  const handleAddTask = async (values: TodoFormValues) => {
    const title = values.title.trim();
    try {
      await addTodo({ isDone: false, title });
      await updateTodos();
      form.resetFields();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Unknown error");
      }
    }
  };

  console.log("TodoInput");
  return (
    <>
      <div className={styles.wrapper}>
        <Form
          form={form}
          name="todo"
          onFinish={handleAddTask}
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
            <Input placeholder="Input your task" className={styles.taskInput} />
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

export default memo(AddTaskInput);

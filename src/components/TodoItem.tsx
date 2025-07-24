import { useState, type FC } from "react";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import acceptIcon from "../assets/accept.svg";
import cancelIcon from "../assets/cancel.svg";
import IconButton from "./IconButton";
import styles from "../components/TodoItem.module.scss";
import { deleteTodos, editTodos } from "../api/http";
import type { Todo, UpdateTodos } from "../types/Todo";

type TodoItem = {
  todo: Todo;
  updateTodos: UpdateTodos;
};

const TodoItem: FC<TodoItem> = ({ todo, updateTodos }) => {
  const [editTodoText, setEditTodoText] = useState<string>("");
  const [isTaskEditing, setIsTaskEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleDelete(id: number) {
    try {
      await deleteTodos(id);
      await updateTodos();
    } catch (error) {
      alert(error);
    }
  }

  async function handleSaveEdit(id: number, editTodoText: { title: string }) {
    try {
      await editTodos(id, editTodoText);
      await updateTodos();
      setEditTodoText("");
    } catch (error) {
      alert(error);
    }
  }

  async function handleCheckbox(id: number, isDone: boolean) {
    try {
      await editTodos(id, { isDone: !isDone });
      await updateTodos();
    } catch (error) {
      alert(error);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimText = editTodoText;

    if (trimText === "") {
      setError("Enter the task name");
    } else if (trimText.length < 2) {
      setError("Minimum of 2 characters");
    } else if (trimText.length >= 64) {
      setError("Maximum of 64 characters");
    } else {
      handleSaveEdit(todo.id, { title: editTodoText });
    }
  }

  function handleEditCancel() {
    setIsTaskEditing(false);
  }
  function handleEditClick() {
    setEditTodoText(todo.title.trim());
    setIsTaskEditing(true);
  }

  return (
    <div>
      {isTaskEditing ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.control}>
            <input
              type="text"
              className={styles.inputEdit}
              onChange={(e) => {
                setEditTodoText(e.target.value);
              }}
              value={editTodoText}
              placeholder="Edit task"
            />
            <div className={styles.buttonControl}>
              <div className={styles.iconDiv}>
                <IconButton type="submit" variant="primary">
                  <img src={acceptIcon} alt="acceptIcon" />
                </IconButton>
                <IconButton
                  type="button"
                  onClick={handleEditCancel}
                  variant="danger"
                >
                  <img src={cancelIcon} alt="cancelIcon" />
                </IconButton>
              </div>
            </div>
          </div>
          {error && (
            <div className={styles.validation}>
              <p>{error}</p>
            </div>
          )}
        </form>
      ) : (
        <div className={styles.control}>
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={() => handleCheckbox(todo.id!, todo.isDone)}
          />
          <p
            className={`${styles.titleWrapper} ${
              todo.isDone ? styles.completed : undefined
            }`}
          >
            {todo.title}
          </p>

          <div className={styles.iconDiv}>
            <IconButton onClick={() => handleDelete(todo.id!)} variant="danger">
              <img src={deleteIcon} alt="Delete" />
            </IconButton>
            <IconButton onClick={handleEditClick} variant="secondary">
              <img src={editIcon} alt="Edit" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;

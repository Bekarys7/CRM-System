import { useState } from "react";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import IconButton from "./IconButton";
import styles from "../components/TodoItem.module.scss";
import { deleteTodos, editTodos } from "../api/http";

export default function TodoItem({ todo, updateTodos }) {
  const [editTodoText, setEditTodoText] = useState("");
  const [isTaskEditing, setIsTaskEditing] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const isInvalidText =
    editTodoText.trim() === "" ||
    editTodoText.length < 2 ||
    editTodoText.length >= 64;

  async function handleDelete(id) {
    try {
      await deleteTodos(id);
      await updateTodos();
    } catch (error) {
      alert(error);
    }
  }

  async function handleSaveEdit(id, editTodoText) {
    try {
      await editTodos(id, { title: editTodoText });
      await updateTodos();
      setEditTodoText("");
    } catch (error) {
      alert(error);
    }
  }

  async function handleCheckbox(id, isDone) {
    try {
      await editTodos(id, { isDone: !isDone });
      await updateTodos();
    } catch (error) {
      alert(error);
    }
  }

  function getValidationMessage(text) {
    if (text.trim() === "") return "Enter the task name";
    if (text.length < 2) return "Minimum of 2 characters";
    if (text.length >= 64) return "Maximum of 64 characters";
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowValidation(true);
    if (isInvalidText) return;

    handleSaveEdit(todo.id, editTodoText);
  }

  function handleEditCancel() {
    setIsTaskEditing(false);
  }
  function handleEditClick() {
    setEditTodoText(todo.title);
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
                setShowValidation(false);
              }}
              value={editTodoText}
              placeholder="Edit task"
            />
          </div>
          {showValidation && (
            <div className={styles.validation}>
              {getValidationMessage(editTodoText)}
            </div>
          )}

          <div className={styles.buttonControl}>
            <button type="submit">Save</button>
            <button type="button" onClick={handleEditCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.control}>
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={() => handleCheckbox(todo.id, todo.isDone, todo.title)}
          />
          <p
            className={`${styles.titleWrapper} ${
              todo.isDone ? styles.completed : undefined
            }`}
          >
            {todo.title}
          </p>
          <div>
            <IconButton onClick={() => handleDelete(todo.id)} variant="danger">
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
}

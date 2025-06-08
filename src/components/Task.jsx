import { useState, useEffect } from "react";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import styles from "../components/Task.module.scss";
import Input from "./input";

export default function Task({
  userToDos,
  deleteTask,
  editTask,
  toggleCheckBox,
  tab,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  function handleStartEdit(id, title) {
    setEditingId(id);
    setEditText(title);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  function handleSaveEdit(id) {
    editTask(id, editText);
    handleCancelEdit();
  }

  return userToDos.map((item) => {
    const isEditing = editingId === item.id;

    return (
      <div key={item.id}>
        {isEditing ? (
          <>
            <div className={styles.control}>
              <Input
                type="text"
                className={styles.inputEdit}
                onChange={(e) => setEditText(e.target.value)}
                value={editText}
                placeholder="Edit task"
              />
            </div>
            <div className={styles.buttonControl}>
              <button onClick={() => handleSaveEdit(item.id)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </>
        ) : (
          <div className={styles.control}>
            <input
              type="checkbox"
              name="task"
              value="task"
              checked={item.isDone}
              onChange={() => toggleCheckBox(item.id)}
            />
            <label>{item.title}</label>
            <div>
              <button
                onClick={() => deleteTask(item.id)}
                className={styles.editButton}
              >
                <img src={deleteIcon} alt="Delete" />
              </button>
              <button
                onClick={() => handleStartEdit(item.id, item.title)}
                className={styles.deleteButton}
              >
                <img src={editIcon} alt="Edit" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  });
}

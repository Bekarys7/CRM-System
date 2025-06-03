import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import styles from "../components/Task.module.scss";
import { useState } from "react";

export default function Task({ userTasks }) {
  const [check, setChecked] = useState(false);

  function checkedHandle(id) {
    setChecked((prevCheck) => {
      return !prevCheck;
    });
    userTasks[id].completed = true;
  }

  return userTasks.map((item) => {
    return (
      <div className={`${styles.control}`} key={item.id}>
        <div>
          <input
            type="checkbox"
            id="toDoTasks"
            name="task"
            value="task"
            onChange={() => checkedHandle(item.id)}
            checked={item.check}
          />
          <label>{item.task}</label>
        </div>
        <div>
          <button className={styles.editButton}>
            <img src={deleteIcon} />
          </button>
          <button className={styles.deleteButton}>
            <img src={editIcon} />
          </button>
        </div>
      </div>
    );
  });
}

import { useState } from "react";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import styles from "../components/Task.module.scss";

export default function Task({ userTasks, checked }) {
  const [checkedCheckBox, setChecked] = useState(true);
  function handleChecked() {
    setChecked((prevValue) => !prevValue);
  }

  return userTasks.map((item) => {
    return (
      <div className={styles.control} key={item.id}>
        <div>
          <input
            checked={checkedCheckBox}
            type="checkbox"
            id="toDoTasks"
            name="task"
            value="task"
            onChange={handleChecked}
          />
          <label className={checked ? styles.underline : ""}>{item.name}</label>
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

import { useState } from "react";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import styles from "../components/Task.module.scss";
import Input from "./input";

export default function Task({ userToDos, deleteTask }) {
  console.log(userToDos);

  const [buttonEdit, setButtonEdit] = useState(true);
  function handleEdit() {
    setButtonEdit((prevButton) => !prevButton);
  }

  return userToDos.map((item) => {
    return (
      <div key={item.id}>
        {buttonEdit ? (
          <div className={styles.control}>
            <>
              <input type="checkbox" name="task" value="task" />
              <label>{item.title}</label>
            </>
            <div>
              <button
                onClick={() => deleteTask(item.id)}
                className={styles.editButton}
              >
                <img src={deleteIcon} />
              </button>
              <button onClick={handleEdit} className={styles.deleteButton}>
                <img src={editIcon} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.control} key={item.id}>
              <Input type="text" className={styles.inputEdit} />
            </div>
            <div className={styles.buttonControl}>
              <button>Save</button>
              <button onClick={handleEdit}>Cancel</button>
            </div>
          </>
        )}
      </div>
    );
  });
}

import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import styles from "../components/Task.module.scss";

export default function Task({ userTasks }) {
  return userTasks.map((item) => {
    return (
      <div className={`${styles.control}`} key={item.id}>
        <div>
          <input type="checkbox" id="toDoTasks" name="task" value="task" />
          <label>{item.name}</label>
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

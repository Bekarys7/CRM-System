import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import styles from "../components/Task.module.scss";

export default function Task({ userToDos, deleteTask }) {
  console.log(userToDos);
  return userToDos.map((item) => {
    return (
      <div className={`${styles.control}`} key={item.id}>
        <div>
          <input
            type="checkbox"
            id={`toDoTasks-${item.id}`}
            name="task"
            value="task"
          />
          <label>{item.title}</label>
        </div>
        <div>
          <button
            onClick={() => deleteTask(item.id)}
            className={styles.editButton}
          >
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

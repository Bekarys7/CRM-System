import TodoItem from "./TodoItem";

export default function TodoList({ toDoArray, handlefetchUserTodos }) {
  return toDoArray.map((item) => {
    return (
      <div key={item.id}>
        <TodoItem item={item} handlefetchUserTodos={handlefetchUserTodos} />
      </div>
    );
  });
}

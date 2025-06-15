import TodoItem from "./TodoItem";

export default function TodoList({ toDoArray, updateTodos }) {
  return toDoArray.map((item) => {
    return (
      <div key={item.id}>
        <TodoItem item={item} updateTodos={updateTodos} />
      </div>
    );
  });
}

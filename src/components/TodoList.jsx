import TodoItem from "./TodoItem";

export default function TodoList({ toDoArray, updateTodos }) {
  return toDoArray.map((todo) => {
    return (
      <div key={todo.id}>
        <TodoItem todo={todo} updateTodos={updateTodos} />
      </div>
    );
  });
}

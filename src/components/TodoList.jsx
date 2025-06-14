import TodoItem from "./TodoItem";

export default function TodoList({
  toDoArray,
  updateTodos,
  todoText,
  setTodoText,
}) {
  return toDoArray.map((item) => {
    return (
      <div key={item.id}>
        <TodoItem
          item={item}
          updateTodos={updateTodos}
          todoText={todoText}
          setTodoText={setTodoText}
        />
      </div>
    );
  });
}

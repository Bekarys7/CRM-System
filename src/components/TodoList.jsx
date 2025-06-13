import TodoItem from "./TodoItem";

export default function TodoList({ userToDos, handlefetchUserTodos }) {
  return userToDos.map((item) => {
    return (
      <div key={item.id}>
        <TodoItem
          item={item}
          handlefetchUserTodos={handlefetchUserTodos}
          userToDos={userToDos}
        />
      </div>
    );
  });
}
